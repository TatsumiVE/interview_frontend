import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dropdown } from "../../components";
export const InterviewCreate = () => {
  const [department_id, setDepartment] = useState([]);
  const [position_id, setPosition] = useState([]);
  const [formData, setFormData] = useState({
    stage_name: "",
    datetime: "",
    location: "",
  });
  const [interviewStages, setInterviewStages] = useState([
    { id: 1, name: "First Interview" },
    { id: 2, name: "Technical Interview" },
    { id: 3, name: "Final Interview" },
  ]);
  const [locations, setLocations] = useState([
    { id: 1, name: "Online" },
    { id: 2, name: "Personal" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchData = async () => {
    try {
      const positionResponse = await axios.get(
        "http://localhost:8000/api/positions"
      );
      setPosition(positionResponse.data);

      const departmentResponse = await axios.get(
        "http://localhost:8000/api/departments"
      );
      setDepartment(departmentResponse.data);

      return {
        positions: positionResponse.data,
        departments: departmentResponse.data,
      };
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: data,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get", "positions", "departments"],
    queryFn: fetchData,
  });

  if (isLoading) return "Loading...";

  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      Interview Create
      <br />
      <label>Date and Time:</label>
      <input
        type="datetime-local"
        name="datetime"
        value={formData.datetime}
        onChange={handleChange}
      />
      <br />
      {isSuccess ? (
        <>
          <Dropdown
            labelName="Positions"
            options={data.positions.data}
            selectedValue={position_id}
            onChange={(e) => setPosition(e.target.value)}
          ></Dropdown>
          <br />
          <Dropdown
            labelName="Departments"
            options={data.departments.data}
            selectedValue={department_id}
            onChange={(e) => setDepartment(e.target.value)}
          ></Dropdown>
        </>
      ) : (
        <p>No Language is Not provided</p>
      )}
      <br />
      <Dropdown
        labelName="Location"
        options={locations}
        selectedValue={locations.id}
        onChange={(e) => setLocations(e.target.value)}
      ></Dropdown>
      <br />
      <Dropdown
        labelName="Interview Stages"
        options={interviewStages}
        selectedValue={interviewStages.id}
        onChange={(e) => setInterviewStages(e.target.value)}
      ></Dropdown>
    </div>
  );
};
