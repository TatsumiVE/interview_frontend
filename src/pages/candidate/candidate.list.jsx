<<<<<<< HEAD
import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export const CandidateList = () => {
  const { token, user } = useAuth();

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
=======
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
export const CandidateList = () => {
  // const navigate = useNavigate();

  const getCandidates = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/candidates");
>>>>>>> c3adf8f00601e974482b82d9a9c07ae04471eb8b
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
<<<<<<< HEAD

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <p>Welcome, !</p>
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
                <Link to={`/candidate/interview/${candidate.id}`}>
                  Interview
                </Link>
                /
                <Link
                  to={`/candidate/interview-assessment/${candidate.id}/${user.id}`}
                >
                  Assessment
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
=======
  if (isLoading) return "Loading...";
  if (isError) return "something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table-wrap">
      <div className="table-wrap__head">
       <div className="create-content">
        <button type="button">
            <Link to="candidate/create">Create Candidate</Link>
          </button>
       </div>
      </div>

      <div className="table-wrap__main">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Applied Position</th>
              <th>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.phone_number}</td>
                <td>{candidate.position.name}</td>
                <td>
                  {candidate.specific_languages
                    .map((language) => language.devlanguage.name)
                    .join(", ")}
                </td>
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
>>>>>>> c3adf8f00601e974482b82d9a9c07ae04471eb8b
    </div>
  );
};
