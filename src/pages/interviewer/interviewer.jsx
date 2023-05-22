import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export const Employee = () => {

  const getInterviewers = async () => {
    console.log("here");
    const response = await axios.get('http://localhost:8000/api/interviewers');
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
    queryFn: getInterviewers,
  });

  if (isLoading) return "Loading.....";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <button type="button">
        <Link to="create">Create Interviewer</Link>
      </button>
       {isSuccess && interviewers.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewers.map((interviewer) => (
                <tr key={interviewer.id}>
                  <td>{interviewer.id}</td>
                  <td>{interviewer.name}</td>
                  <td>{interviewer.position_id.name}</td>
                  <td>{interviewer.position_id.department.name}</td>
                  <td>
                    <button type="button">
                      <Link to="update">Update</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Interviewer list not found</p>
      )}
    </div>


  );
};
