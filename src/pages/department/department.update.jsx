import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const DepartmentUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [department, setDepartment] = useState("");
  //console.log(agency);

  const updateDepartment = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/departments/${id}`,
        department,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateDepartment.mutate();
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
      //console.error(error);
    }
  };

  const { data: departmentData } = useQuery(["departmentData", id], getDepartment);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={department.name}
          onChange={(e) => setDepartment({ ...department, name: e.target.value })}
          placeholder="Enter name"
        />
        <div>
          <button type="submit">Update</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </>
  );
};





// export const DepapartmentUpdate = () => {
//   return(
//     <>
//     </>
//   )
// }