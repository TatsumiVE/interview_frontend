import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { Button,Input,Dropdown } from "../../components";

export const UserCreate = () => {
  const { id } = useParams();
  const [interviewer, setInterviewer] = useState({
    interviewer_id: id,
    password: "",
    role: "",
  });
  const { token } = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

  const getRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/roles",
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
    data: roles,
    isLoading: isRolesLoading,
    isError: isRolesError,
    isSuccess: isRolesSuccess,
    error: rolesError,
  } = useQuery("roles", getRoles);

  const addUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        interviewer
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createUser } = useMutation({
    mutationKey: ["post", "users"],
    mutationFn: addUser,
  });

  if (isInterviewerLoading || isRolesLoading) return "Loading...";
  if (isInterviewerError) return "Something went wrong...";
  if (interviewerError)
    return `An error has occurred: ${interviewerError.message}`;
  if (isRolesError) return "Something went wrong...";
  if (rolesError) return `An error has occurred: ${rolesError.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className='card-min'>
      <div className="card-min__header">
        <h2>Create User Role</h2>
      </div>
      <form onSubmit={handleSubmit} className="card-min__form">
        <div>
          <Input
            labelName="Name"
            type="text"
            name="name"
            placeholder=" Enter Name..."
            value={interviewers.name}

          />
          <Input
            labelName="Email"
            type="email"
            name="email"
            placeholder=" Enter Email..."
            value={interviewers.email}

          />
          <Input
            labelName="Password"
            type="password"
            name="password"
            placeholder=" Enter Password..."
            onChange={(e) => setInterviewer({ ...interviewer, password: e.target.value })}
          />
          <Input
            labelName="Confirm Password"
            type="password"
            name="password_confirmation"
            placeholder=" Enter Confirm Password..."
            onChange={(e) => e.target.value}
          />
          <Dropdown
            labelName="Role"
            options={roles}
            selectedValue={roles.id}
            onChange={(e) => setInterviewer({ ...interviewer, role: e.target.value })}
          ></Dropdown>

          <div className="button-group--user">
            <Button type="submit" text="Create" className="txt-light btn-primary" />
            <Button type="button" text="Cancel" className="txt-light btn-default" />
          </div>
        </div>
      </form>
    </div>
  );
};
