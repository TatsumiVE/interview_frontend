import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Dropdown, Input } from "../../components/utilites";

export const InterviewerCreate = () => {
  const [position_id, setPosition] = useState("");
  const [name, setName] = useState("");
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/positions");

    console.log(response.data.data);
    return response.data.data;
  };

  const {
    data: positions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get", "positions"],
    queryFn: fetchData,
  });

  const addInterviewer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/interviewers",
        { name, position_id }
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
              placeholder="Enter Name"
            ></Input>
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
          <Button type="submit" text="Create" className="txt-light btn-primary" />
          <Button type="submit" text="Cancel" className="txt-light btn-default" />
        </div>
      </form>
    </div>
  );
};
