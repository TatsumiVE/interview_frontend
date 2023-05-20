import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
export const CandidateList = () => {
  // const navigate = useNavigate();

  const getCandidates = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/candidates");
    console.log(response.data);
    return response.data.data;
  };

  const {
    data: candidates,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get", "candidates"],
    queryFn: getCandidates,
  });
  if (isLoading) return "Loading...";
  if (isError) return "something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <button type="button">
        <Link to="candidate/create">Create Candidate</Link>
      </button>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Applied Position</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.gender}</td>
              <td>{candidate.phone_number}</td>
              <td>{candidate.positions_id.name}</td>
              <td>{candidate.languages}</td>
              <td>
                <Link to={`/candidate/interview/${candidate.id}`}>
                  Interview
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
