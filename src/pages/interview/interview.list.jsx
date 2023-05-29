import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

export const CandidateList = () => {
  const { token, user, can } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  const getCandidates = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/api/candidates",
      config
    );

    return response.data.data;
  };

  const handleTerminate = (candidateId) => {
    interviewTerminate(candidateId);
  };
  // state = [];
  // terminate(){}; if(isSuccess) setState(state.map(c=> c.id===id ? {...c, status:1}))
  // cTOShow = state.filter(c=> c.status===0)
  // cToShow
  // button
  const terminateProcess = async (id) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/interview-process/terminate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const { mutate: interviewTerminate } = useMutation({
    mutationKey: ["post", "interview-process", "terminate"],
    mutationFn: terminateProcess,
    onSuccess: () => {
      queryClient.invalidateQueries(["get", "candidates"]);
    },
  });

  const {
    data: candidateList,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["get", "candidates"],
    queryFn: getCandidates,
  });

  const findStageId = (candidateId) => {
    const candidate = candidateList.find(
      (candidate) => candidate.id === candidateId
    );

    if (candidate && candidate.interviews.length > 0) {
      const lastInterview =
        candidate.interviews[candidate.interviews.length - 1];
      if (
        lastInterview.interview_stage &&
        lastInterview.interview_stage.stage_name !== undefined
      ) {
        return lastInterview.interview_stage.id;
      } else {
        return "Unknown stage";
      }
    } else {
      return 1;
    }
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      {can("candidateCreate") && (
        <button type="button">
          <Link to="candidate/create">Create Candidate</Link>
        </button>
      )}
      {message && <div>{message}</div>}
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Stage</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Applied Position</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && candidateList.length > 0 ? (
            candidateList.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.interviews.length}</td>
                <td>
                  {candidate.gender == 1
                    ? "Male"
                    : candidate.gender == 2
                    ? "Female"
                    : "Non-Binary"}
                </td>
                <td>{candidate.phone_number}</td>
                <td>{candidate.position.name}</td>
                <td>
                  {candidate.specific_languages
                    .map((language) => language.devlanguage.name)
                    .join(", ")}
                </td>
                <td>
                  {can("interviewProcessCreate") && (
                    <Link
                      to={`/candidate/interview/${candidate.id}/${candidate.interviews.length}`}
                    >
                      Interview
                    </Link>
                  )}
                  /
                  <Link
                    to={`/candidate/interview-assessment/${candidate.id}/${user.id}`}
                  >
                    Assessment
                  </Link>
                  {can("interviewProcessUpdate") && (
                    <Link
                      to={`/candidate/interview-result/${
                        candidate.id
                      }/${findStageId(candidate.id)}`}
                      state={{ candidateName: candidate.name }}
                    >
                      Result
                    </Link>
                  )}
                  {can("interviewProcessTerminate") && (
                    <button
                      type="button"
                      onClick={() => {
                        handleTerminate(candidate.id);
                      }}
                    >
                      {" "}
                      Terminate
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                {isLoading ? "Loading..." : "No candidates found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
const CandidateListWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CandidateList />
    </QueryClientProvider>
  );
};

export default CandidateListWrapper;
