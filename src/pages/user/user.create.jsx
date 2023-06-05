import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { Button, Input, Dropdown, ButtonLink } from "../../components";
import { toast } from "react-toastify";

export const UserCreate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState([]);


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [interviewer, setInterviewer] = useState({
    interviewer_id: id,
    password: '',
    role: '',
  });


  const addUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        interviewer,
        config
      );

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate('/user');
      }, 1000);

      return response;

    } catch (error) {
      setError(error.response.data.err_msg.errors);

    }
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
      const response = await axios.get("http://localhost:8000/api/roles", config);
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

  const { data: roles, isLoading: isRolesLoading, isError: isRolesError, isSuccess: isRolesSuccess, error: rolesError } = useQuery(
    'roles',
    getRoles
  );


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

    // if (!interviewer.password) {
    //   setError({ password: "The password field is required." });
    //   return;
    // }

    // if (!interviewer.password_confirmation) {
    //   setError({ password_confirmation: "The password confirmation field is required." });
    //   return;
    // }

    // if (!interviewer.role) {
    //   setError({ role: "The role field is required." });
    //   return;
    // }

    // if (interviewer.password !== interviewer.password_confirmation) {
    //   setError({ errorMessage: "The password confirmation does not match." });
    //   return;
    // }


    createUser();
  };

  return (
    <div className='card-min'>
      <div className="card-min__header">
        <h2>Create User Role</h2>
      </div>

      <form onSubmit={handleSubmit} className="card-min__form">
        
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            placeholder=" Enter Name..."
            value={interviewers.name}
          />
 </div>
        <div className="input-group">
          <Input
            labelName="Email"
            type="email"
            name="email"
            placeholder=" Enter Email..."
            value={interviewers.email}
          />
 </div>
        <div className="input-group">
          <Input
            labelName="Password"
            type="password"
            name="password"
            placeholder=" Enter Password..."
            onChange={(e) => setInterviewer({ ...interviewer, password: e.target.value })}
            errorMessage="*"
          />
          {error.password && <span className="txt-danger txt-ss">{error.password}</span>}
          </div>
        <div className="input-group">
          <Input
            labelName="Confirm Password"
            type="password"
            name="password_confirmation"
            placeholder=" Enter Confirm Password..."
            onChange={(e) => setInterviewer({ ...interviewer, password_confirmation: e.target.value })}
            errorMessage="*"
          />
          {error.password_confirmation && <span className="txt-danger txt-ss">{error.password_confirmation}</span>}
          </div>
        <div className="input-group">
          <Dropdown
            labelName="Role"
            options={roles}
            selectedValue={roles.id}
            onChange={(e) => setInterviewer({ ...interviewer, role: e.target.value })}
            errorMessage="*"
          />
          {error.role && <span className="txt-danger txt-ss">{error.role}</span>}
          </div>
        <div className="input-group">
          <div className="button-group--user">
            <Button type="submit" text="Create" className="txt-light btn-primary" />
            <ButtonLink type="button" className="btn-default cancel" route={"/interviewer"} text="Cancel" linkText="txt-light txt-sm" />
          </div>
        </div>
      </form>
    </div>
  );
};
