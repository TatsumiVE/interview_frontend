import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
export const Employee = () => {
  const getEmployee = async () => {
    console.log("here");
    const response = await axios.get("http://localhost:8000/api/interviewers");
    console.log(response.data.data);

    return response.data.data;
  };
  const {
    data: interviewers,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get", "interviewers"],
    queryFn: getEmployee,
  });
  if (isLoading) return "Loading.....";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <button type="button">
        <Link to="create">Create Interviewer</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>name</th>
            <th>position</th>
            <th>department</th>
          </tr>
        </thead>
        <tbody>
          {interviewers.map((interviewer) => (
            <tr key={interviewer.id}>
              <td>{interviewer.id}</td>
              <td>{interviewer.name}</td>
              <td>{interviewer.position_id.name}</td>
              <td>{interviewer.position_id.department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
