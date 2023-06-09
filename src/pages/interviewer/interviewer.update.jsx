import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../store/AuthContext";
import { Input, Dropdown, Button, ButtonLink } from "../../components";
import departmentService from "../../services/departmentService";
import positionService from "../../services/positionService";
import Loader from "../../components/loader";

export const InterviewerUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [interviewer, setInterviewer] = useState({
    name: "",
    email: "",
    department_id: "",
    position_id: "",
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addInterviewer = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/interviewers/${id}`,
        interviewer,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/interviewer");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
      console.log(error.response.data.data);
    }
  };

  const { mutate: updateInterviewer } = useMutation({
    mutationKey: ["put", "interviewers"],
    mutationFn: addInterviewer,
  });

  const handleUpdate = (event) => {
    event.preventDefault();

    if (interviewer.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    if (interviewer.email == "") {
      const response = setError({ email: "The email field is required." });
      return response;
    }

    if (interviewer.department_id == "") {
      const response = setError({
        department_id: "The department field is required.",
      });
      return response;
    }

    if (interviewer.position_id == "") {
      const response = setError({
        position_id: "The name position is required.",
      });
      return response;
    }

    updateInterviewer();
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
    return <Loader />;
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
        <div className="input-group">
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

          {error.name && (
            <span className="txt-danger txt-ss">{error.name}</span>
          )}
        </div>
        <div className="input-group">
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
          {error.email && (
            <span className="txt-danger txt-ss">{error.email}</span>
          )}
        </div>
        <div className="input-group">
          <Dropdown
            labelName="Department"
            options={departments}
            selectedValue={interviewer.department_id}
            onChange={(e) =>
              setInterviewer({ ...interviewer, department_id: e.target.value })
            }
            errorMessage="*"
          />
          {error.department_id && (
            <span className="txt-danger txt-ss">{error.department_id}</span>
          )}
        </div>
        <div className="input-group">
          <Dropdown
            labelName="Position"
            options={positions}
            selectedValue={interviewer.position_id}
            onChange={(e) =>
              setInterviewer({ ...interviewer, position_id: e.target.value })
            }
            errorMessage="*"
          />
          {error.position_id && (
            <span className="txt-danger txt-ss">{error.position_id}</span>
          )}
        </div>
        <div className="button-group--user">
          <Button
            type="submit"
            className="txt-light btn-primary"
            text="Update"
          />
          <ButtonLink
            type="button"
            className="btn-btnColor cancel"
            route={"/interviewer"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
