// import axios from "axios";
// import { useAuth } from "../../store/AuthContext";
// import { useLocation, Link } from "react-router-dom";
// import { useQuery, useMutation, QueryClient } from "react-query";
// import Can from "../../components/utilites/can";

// export const InterviewList = () => {
//   return <></>;
// };
// const { token, user, can } = useAuth();
// const queryClient = new QueryClient();

// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const message = searchParams.get("message");

// const getCandidates = async () => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     "http://127.0.0.1:8000/api/candidates",
//     config
//   );
//   return response.data.data;
// };

// const handleTerminate = (candidateId) => {
//   interviewTerminate(candidateId);
// };

// const terminateProcess = async (id) => {
//   const response = await axios.post(
//     `http://127.0.0.1:8000/api/interview-process/terminate/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// const { mutate: interviewTerminate } = useMutation({
//   mutationKey: ["post", "interview-process", "terminate"],
//   mutationFn: terminateProcess,
//   onSuccess: () => {
//     queryClient.invalidateQueries(["get", "candidates"]);
//   },
// });

// const {
//   data: candidateList,
//   isLoading,
//   isError,
//   isSuccess,
//   error,
// } = useQuery({
//   queryKey: ["get", "candidates"],
//   queryFn: getCandidates,
// });

// const findStageId = (candidateId) => {
//   const candidate = candidateList.find(
//     (candidate) => candidate.id === candidateId
//   );

//   if (candidate && candidate.interviews.length > 0) {
//     const lastInterview =
//       candidate.interviews[candidate.interviews.length - 1];
//     if (
//       lastInterview.interview_stage &&
//       lastInterview.interview_stage.stage_name !== undefined
//     ) {
//       return lastInterview.interview_stage.id;
//     } else {
//       return "Unknown stage";
//     }
//   } else {
//     return 1;
//   }
// };
// if (isLoading) return "Loading...";
// if (isError) return "Something went wrong";
// if (error) return "An error has occurred: " + error.message;

// const interview = (candidate) => {
//   const interviews = candidate.interviews || [];
//   const lastInterview = interviews[interviews.length - 1] || {};
//   const lastStage = lastInterview.interview_stage.stage_name || 0;

//   const canCreate = !(lastStage && !lastInterview.interview_result)

//   const canAssessment = lastStage && !lastInterview.interview_result;

//   const canResult = lastStage && !lastInterview.interview_result;

//   return {
//     canCreate,
//     canAssessment,
//     canResult,
//     lastStage
//   }
// }

import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import Can from "../../components/utilites/can";
import languageService from "../../services/languageService";

import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { Dropdown } from "../../components";

export const InterviewList = () => {
  const { token, user } = useAuth();
  const queryClient = new QueryClient();
  const [language, setLanguage] = useState("All");
  const [stageFilter, setStageFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(
    new Date().toLocaleDateString("af-ZA")
  );
  const [endDateFilter, setEndDateFilter] = useState(
    new Date().toLocaleDateString("af-ZA")
  );

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

  const {
    data: languages,
    isLoading: isLanguageLoading,
    isError: isLanguageError,
    isSuccess: isLanguageSuccess,
    error: languageError,
  } = useQuery(["get", "languages"], () => languageService.getAll(token));

  // useEffect(() => {
  //   languages && setLanguage(languages);
  // }, [languages]);

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

  if (isLoading) return <Loader />;
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  const check = (candidate) => {
    const interviews = candidate.interviews || [];
    const lastInterview = interviews[interviews.length - 1] || {};
    const lastStage = lastInterview.interview_stage?.stage_name || 0;

    const canCreate = !(lastStage && !lastInterview.interview_result);

    const canAssessment = lastStage && !lastInterview.interview_result;

    const canResult = lastStage && !lastInterview.interview_result;

    return {
      canCreate,
      canAssessment,
      canResult,
      lastStage,
    };
  };

  const candidateToShow = (
    language === "All"
      ? candidateList
      : candidateList.filter((candidate) => {
          return candidate.specific_languages
            .map((lan) => lan.devlanguage.name)
            .includes(language);
        })
  )?.filter((candidate) => {
    const date = candidate?.interviews[0]?.interview_stage?.interview_date;
    return startDateFilter < date && date < endDateFilter;
  });

  return (
    <div>
      <button type="button">
        <Link to="/candidates/create">Create Candidate</Link>
      </button>
      <Dropdown
        labelName="Language"
        options={[{ id: 0, name: "All" }, ...languages]}
        onChange={(e) => {
          setLanguage(
            [{ id: 0, name: "All" }, ...languages][e.target.value].name
          );
        }}
        // selectedValue={language}
        hide={true}
      />
      <button type="button" onClick={() => setStageFilter(1)}>
        stage1
      </button>
      <button type="button" onClick={() => setStageFilter(2)}>
        stage2
      </button>
      <button type="button" onClick={() => setStageFilter(3)}>
        stage3
      </button>
      <input
        type="date"
        value={startDateFilter}
        onChange={(e) => {
          if (e.target.value > endDateFilter)
            return alert("start-date can't greater than end-date");
          setStartDateFilter(e.target.value);
        }}
      />
      <input
        type="date"
        value={endDateFilter}
        onChange={(e) => {
          setEndDateFilter(e.target.value);
        }}
      />
      <span>Count: {candidateList.length}</span>

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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && candidateToShow.length > 0 ? (
            candidateToShow.map((candidate) => (
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
                  &nbsp;
                  <Can permission={"interviewProcessCreate"}>
                    <Link
                      to={`create`}
                      state={{
                        id: candidate.id,
                        stageId: candidate.interviews.length,
                      }}
                      style={{
                        pointerEvents: check(candidate).canCreate
                          ? "all"
                          : "none",
                        background: check(candidate).canCreate
                          ? "green"
                          : "red",
                      }}
                    >
                      Interview
                    </Link>
                  </Can>
                  <Can permission={"remarkAssessmentCreate"}>
                    <Link
                      to={`assessment`}
                      state={{
                        candidateId: candidate.id,
                        interviewerId: user.id,
                      }}
                      style={{
                        pointerEvents: check(candidate).canAssessment
                          ? "all"
                          : "none",
                        background: check(candidate).canAssessment
                          ? "green"
                          : "red",
                      }}
                    >
                      Assessment
                    </Link>
                  </Can>
                  <Can permission={"interviewSummarize"}>
                    <Link
                      to={`result`}
                      state={{
                        candidateId: candidate.id,
                        stageId: findStageId(candidate.id),
                        candidateName: candidate.name,
                      }}
                      style={{
                        pointerEvents: check(candidate).canResult
                          ? "all"
                          : "none",
                        background: check(candidate).canResult
                          ? "green"
                          : "red",
                      }}
                    >
                      Result
                    </Link>
                  </Can>
                  <Can permission={"interviewProcessTerminate"}>
                    <button
                      type="button"
                      onClick={() => {
                        handleTerminate(candidate.id);
                      }}
                    >
                      Terminate
                    </button>
                  </Can>
                </td>
                <td>
                  {candidate?.interviews[0]?.interview_stage?.interview_date}
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
