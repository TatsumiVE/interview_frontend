import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={interviewers.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={interviewers.email}
          />
          <input
            type="password"
            name="password"
            placeholder=" Enter Password"
            onChange={(e) =>
              setInterviewer({ ...interviewer, password: e.target.value })
            }
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder=" Enter Confirm Password"
            onChange={(e) => e.target.value}
          />
          <select
            name="role"
            onChange={(e) =>
              setInterviewer({ ...interviewer, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button type="submit">Create Role</button>
        </div>
      </form>
    </>
  );
};
