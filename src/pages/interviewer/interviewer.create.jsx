import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Dropdown, Input } from "../../components/utilites";

export const InterviewerCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position_id, setPosition] = useState("");
  const [department_id, setDepartment] = useState("");

  const fetchPosition = async () => {
    const response = await axios.get("http://localhost:8000/api/positions");
    return response.data.data;
  };

  const {
    data: positions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get", "positions"],
    queryFn: fetchPosition,
  });

  const fetchDepartment = async () => {
    const response = await axios.get("http://localhost:8000/api/departments");

    return response.data.data;
  }

  const {
    data:departments,
    // isLoading,
    // isError
  }=useQuery({
    queryKey:["get","departments"],
    queryFn:fetchDepartment,
  });

  const addInterviewer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/interviewers",
        { name, email, department_id, position_id }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createInterviewer } = useMutation({
    mutationKey: ["post", "postions"],
    mutationFn: addInterviewer,
  });

  if (isLoading) return "Loading...";
  if (isError) return "error";

  return (
    <div className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createInterviewer();
        }}
      >
        <div className="card-wrap">
          <div className="card-input__group">
            <Input
              labelName="Name"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder=" Enter Name"
            ></Input>
          </div>
          <div className="card-input__group">
            <Input
              labelName="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" Enter Email"
            ></Input>
          </div>
          <div className="card-input__group">
            <Dropdown
              labelName="Department"
              options={departments}
              selectedValue={department_id}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="card-input__group">
            <Dropdown
              labelName="Position"
              options={positions}
              selectedValue={position_id}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-group">
          <Button type="submit" text="Create" className="txt-light btn-primary"/>
          <Button type="button" text="Cancel" className="txt-light btn-default"/>
        </div>
      </form>
    </div>
  );
};
