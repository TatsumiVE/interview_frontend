import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Dropdown } from "../components";

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createInterviewer();
        }}
      >
        <label>
          Interviewer Name
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          ></input>
        </label>

        <label>
          Position
          <Dropdown
            options={positions}
            selectedValue={position_id}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
