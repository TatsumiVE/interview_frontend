import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../store/AuthContext";
import { Input, Dropdown, Button, ButtonLink } from "../../components";
import departmentService from "../../services/departmentService";
import positionService from "../../services/positionService";
import { useNavigate } from "react-router-dom";
export const InterviewerUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState([]);
  const [interviewer, setInterviewer] = useState({
    name: "",
    email: "",
    department_id: "",
    position_id: "",
  });
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updateInterviewer = useMutation(async () => {
    try {
      const response = axios.put(
        `http://localhost:8000/api/interviewers/${id}`,
        interviewer,
        config
      );
      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/interviewer");
      }, 1000);

      return response;
    } catch (error) {
      setError(error.response);
      console.log(error.response);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateInterviewer.mutate();
  };

  const getInterviewer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/interviewers/${id}`,
        config
      );

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
  } = useQuery(["get", "interviewers", "id"], getInterviewer);

  useEffect(() => {
    interviewers && setInterviewer(interviewers);
  }, [interviewers]);

  const {
    data: departments,
    isLoading: isDepartmentLoading,
    isError: isDepartmentError,
    isSuccess: isDepartmentSuccess,
    error: departmentError,
  } = useQuery(["get", "departments"], () => departmentService.getAll(token));

  const {
    data: positions,
    isLoading: isPositionLoading,
    isError: isPositionError,
    isSuccess: isPositionSuccess,
    error: positionError,
  } = useQuery(["get", "positions"], () => positionService.getAll(token));

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
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Interviewer</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <Input
          labelName="Name"
          type="text"
          name="name"
          placeholder="Enter Name..."
          value={interviewer.name}
          onChange={(e) =>
            setInterviewer({ ...interviewer, name: e.target.value })
          }
          errorMessage="*"
        />
        {console.log(error)}
        {error && (
          <span className="txt-danger txt-ss">{error.response.data.name}</span>
        )}
        {error && (
          <span className="txt-danger txt-ss">{error.response.data.email}</span>
        )}
        {error && (
          <span className="txt-danger txt-ss">
            {error.response.data.department_id}
          </span>
        )}
        {error && (
          <span className="txt-danger txt-ss">
            {error.response.data.position_id}
          </span>
        )}

        <Input
          labelName="Email"
          type="email"
          name="email"
          placeholder="Enter Email..."
          value={interviewer.email}
          onChange={(e) =>
            setInterviewer({ ...interviewer, email: e.target.value })
          }
          errorMessage="*"
        />
        {error && <span className="txt-danger txt-ss">{error.email}</span>}

        <Dropdown
          labelName="Department"
          options={departments}
          selectedValue={interviewer.department_id}
          onChange={(e) =>
            setInterviewer({ ...interviewer, department_id: e.target.value })
          }
          errorMessage="*"
        />
        {error && <span className="txt-danger txt-ss">{error.department}</span>}

        <Dropdown
          labelName="Position"
          options={positions}
          selectedValue={interviewer.position_id}
          onChange={(e) =>
            setInterviewer({ ...interviewer, position_id: e.target.value })
          }
          errorMessage="*"
        />
        {error && <span className="txt-danger txt-ss">{error.position}</span>}

        <div className="button-group--user">
          <Button
            type="submit"
            className="txt-light btn-primary"
            text="Update"
          />
          <ButtonLink
            type="button"
            className="btn-default"
            route={"/interviewer"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
