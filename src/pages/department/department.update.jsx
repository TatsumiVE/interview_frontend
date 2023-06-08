import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";
import { toast } from "react-toastify";

export const DepartmentUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [department, setDepartment] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addDepartment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/departments/${id}`,
        department,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/department");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
    }
  };

  const { mutate: updateDepartment } = useMutation({
    mutationKey: ["put", "departments"],
    mutationFn: addDepartment,
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if (department.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    updateDepartment();
  };

  const getDepartment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/departments/${id}`,
        config
      );
      const departmentData = response.data.data;
      if (departmentData) {
        setDepartment(departmentData);
      }
      return departmentData;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: departmentData } = useQuery(
    ["departmentData", id],
    getDepartment
  );

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Department</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            value={department.name}
            onChange={(e) =>
              setDepartment({ ...department, name: e.target.value })
            }
            placeholder="Enter Name..."
            errorMessage="*"
          />
          {error.name && (
            <span className="txt-danger txt-ss">{error.name}</span>
          )}
        </div>

        <div className="button-group--user">
          <Button
            type="submit"
            text="Update"
            className="txt-light btn-primary"
          />
          <ButtonLink
            type="button"
            className="btn-btnColor cancel"
            route={"/department"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
