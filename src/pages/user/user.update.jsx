import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Input, Button, ButtonLink } from "../../components";
import { useAuth } from "../../store/AuthContext";
import Can from "../../components/utilites/can";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const UserUpdate = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${id}`,
        user,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate('/user');
      }, 1000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
      // console.log(error.response.data.data);
    }
  };

  const { mutate: updateUser } = useMutation({
    mutationKey: ["put", "users"],
    mutationFn: addUser,
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if(user.role ==""){
      const response = setError({role:"The role field is required."});
      return response;
    }
    updateUser();
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${id}`,
        config
      );

      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getRole = async () => {
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
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess: isUserSuccess,
  } = useQuery(["users", id], getUser);

  const {
    data: roles,
    isLoading: isRoleLoading,
    isError: isRoleError,
    isSuccess: isRoleSuccess,
    error: roleError,
  } = useQuery(["roles"], getRole);

  if (isUserLoading || isRoleLoading) return "Loading...";
  if (isUserError) return "Something went wrong...";

  if (isRoleError) return "Something went wrong...";
  if (roleError) return `An error has occurred: ${roleError.message}`;

  if (isUserSuccess && isRoleSuccess && user.interviewer_id)
    return (
      <div className="card-min">
        <div className="card-min__header">
          <h2>Update User</h2>
        </div>
        <form onSubmit={handleUpdate} className="card-min__form">
          <Input
            labelName="Name"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.interviewer_id.name}
          />

          <Input
            labelName="Email"
            type="email"
            name="email"
            placeholder=" Enter Email"
            value={user.interviewer_id.email}
          />

          <Dropdown
            labelName="Role"
            options={roles}
            selectedValue={user.role[0].id}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            errorMessage="*"
          />
          {error.role && (
            <span className="txt-danger txt-ss">{error.role}</span>
          )}

          <div className="button-group--user">
            <Can permission={"userUpdate"}>
              <Button
                type="submit"
                className="txt-light btn-primary"
                text="Update"
              />
            </Can>

            <ButtonLink
              type="button"
              className="btn-default"
              route={"/user"}
              text="Cancel"
              linkText="txt-light txt-sm"
            />
          </div>
        </form>
      </div>
    );
};
