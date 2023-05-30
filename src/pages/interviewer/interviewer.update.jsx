import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { Input, Dropdown, Button, ButtonLink } from '../../components';

export const InterviewerUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [error,setError] = useState([]);
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
  const updateInterviewer = useMutation(async () => {
    try {
      axios.put(
        `http://localhost:8000/api/interviewers/${id}`,
        interviewer,
        config
      );
    } catch (error) {
      setError(error.response.data);
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
      setInterviewer(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/departments",
        config
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/positions",
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
    <div className='card-min'>
      <div className="card-min__header">
        <h2>Update Interviewer</h2>
      </div>
      <form onSubmit={handleUpdate} className='card-min__form'>

        <Input
          labelName="Name"
          type="text"
          name="name"
          placeholder="Enter Name..."
          value={interviewer.name}
          onChange={(e) => setInterviewer({ ...interviewer, name: e.target.value })}
          errorMessage="*"
        />
        {error.data && <span className="txt-danger txt-ss">{error.data}</span>}

        <Input
          labelName="Email"
          type="email"
          name="email"
          placeholder="Enter Email..."
          value={interviewer.email}
          onChange={(e) => setInterviewer({ ...interviewer, email: e.target.value })}
          errorMessage="*"
        />
        {error.data && <span className="txt-danger txt-ss">{error.data}</span>}

        <Dropdown
          labelName="Department"
          options={departments}
          selectedValue={interviewer.department_id}
          onChange={(e) => setInterviewer({ ...interviewer, department_id: e.target.value })}
          errorMessage="*"
        />
        {error.department && <span className="txt-danger txt-ss">{error.department}</span>}


        <Dropdown
          labelName="Position"
          options={positions}
          selectedValue={interviewer.position_id}
          onChange={(e) => setInterviewer({ ...interviewer, position_id: e.target.value })}
          errorMessage="*"
        />
         {error.position && <span className="txt-danger txt-ss">{error.position}</span>}

        <div className='button-group--user'>
          <Button type="submit" className='txt-light btn-primary' text="Update" />
          <ButtonLink type="button" className="btn-default" route={"/interviewer"} text="Cancel" linkText="txt-light txt-sm"/>
        </div>

      </form >
    </div >
  );
};
