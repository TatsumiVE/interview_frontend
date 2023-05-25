import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

export const InterviewerUpdate = () => {
  const { id } = useParams();
  const [interviewer, setInterviewer] = useState({
    name: "",
    email: "",
    department_id: "",
    position_id: "",
  });

  const updateInterviewer = useMutation(async () => {
    try {
      axios.put(`http://localhost:8000/api/interviewers/${id}`, interviewer);
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateInterviewer.mutate();
  };

  const getInterviewer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/interviewers/${id}`
      );
      setInterviewer(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/departments");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/positions");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: interviewers,
    isLoading: isInterviewerLoading,
    isError: isInterviewerError,
    isSuccess: isInterviewerSuccess,
    error: interviewerError,
  } = useQuery(["interviewers", id], getInterviewer);

  const {
    data: departments,
    isLoading: isDepartmentLoading,
    isError: isDepartmentError,
    isSuccess: isDepartmentSuccess,
    error: departmentError,
  } = useQuery(["departments"], getDepartment);

  const {
    data: positions,
    isLoading: isPositionLoading,
    isError: isPositionError,
    isSuccess: isPositionSuccess,
    error: positionError,
  } = useQuery(["positions"], getPosition);

  if (isInterviewerLoading || isDepartmentLoading || isPositionLoading)
    return "Loading...";
  if (isInterviewerError) return "Something went wrong...";
  if (interviewerError)
    return `An error has occurred: ${interviewerError.message}`;
  if (isDepartmentError) return "Something went wrong...";
  if (departmentError)
    return `An error has occurred: ${departmentError.message}`;
  if (isPositionError) return "Something went wrong...";
  if (positionError) return `An error has occurred: ${positionError.message}`;

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            name="name"
            placeholder=" Enter Name"
            value={interviewer.name}
            onChange={(e) =>
              setInterviewer({ ...interviewer, name: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            placeholder=" Enter Email"
            value={interviewer.email}
            onChange={(e) =>
              setInterviewer({ ...interviewer, email: e.target.value })
            }
          />
          <select
            name="department"
            value={interviewer.department_id}
            onChange={(e) =>
              setInterviewer({ ...interviewer, department_id: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
                selected={department.id === interviewer.department_id}
              >
                {department.name}
              </option>
            ))}
          </select>
          <select
            name="position"
            value={interviewer.position_id}
            onChange={(e) =>
              setInterviewer({ ...interviewer, position_id: e.target.value })
            }
          >
            <option value="">Select Position</option>
            {positions.map((position) => (
              <option
                key={position.id}
                value={position.id}
                selected={position.id === interviewer.position_id}
              >
                {position.name}
              </option>
            ))}
          </select>
          <div>
            <button type="submit">Update</button>
            <button type="button">Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};
