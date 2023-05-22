import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Dropdown, Button } from "../../components";

export const InterviewCreate = () => {
  const { id } = useParams();
  const [data, setData] = useState([{ interviewer_id: "" }]);
  const [department_id, setDepartment] = useState("");
  const [position_id, setPosition] = useState("");
  const [interviewer_id, setInterviewers] = useState([]);

  const [formData, setFormData] = useState({
    candidate_id: id,
    stage_name: "",
    interview_date: "",
    interview_time: "",
    location: "",
  });
  const createInterview = async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/interview-process",
      formData
    );
    return response;
  };

  const { mutate: interviewProcess } = useMutation({
    mutationKey: ["post", "interview-process"],
    mutationFn: createInterview,
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const requestData = data.map((row) => ({
  //     interviewer_id: row,
  //   }));

  //   const updatedFormData = {
  //     ...formData,
  //     interviewer_id: requestData,
  //   };

  //   interviewProcess(updatedFormData);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = data.map((row) => ({
      interviewer_id: row,
    }));

    const updatedFormData = {
      ...formData,
      interviewer_id: requestData,
    };

    interviewProcess(updatedFormData);
  };

  const handleAdd = () => {
    setData([...data, { interviewer_id: "" }]);
  };

  const handleRemove = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
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

      const interviewerResponse = await axios.get(
        "http://localhost:8000/api/interviewers"
      );
      setInterviewers(interviewerResponse.data.data);

      return {
        positions: positionResponse.data,
        departments: departmentResponse.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: datas,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get", "positions", "departments"],
    queryFn: fetchData,
  });

  const interviewStages = [
    { id: 1, name: "First Interview" },
    { id: 2, name: "Technical Interview" },
    { id: 3, name: "Final Interview" },
  ];
  const location = [
    { id: 1, name: "Online" },
    { id: 2, name: "Personal" },
  ];

  if (isLoading) return "Loading...";

  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      Interview Create
      <br />
      <form onSubmit={handleSubmit} className="card-form">
        <label>Date and Time:</label>
        <input
          type="date"
          name="interview_date"
          value={formData.interview_date}
          onChange={(e) =>
            setFormData({ ...formData, interview_date: e.target.value })
          }
        />

        <input
          type="time"
          name="time"
          value={formData.interview_time}
          onChange={(e) =>
            setFormData({ ...formData, interview_time: e.target.value })
          }
        />

        <br />
        {isSuccess ? (
          <>
            <Dropdown
              labelName="Positions"
              options={datas.positions.data}
              selectedValue={position_id}
              onChange={(e) => setPosition(e.target.value)}
            ></Dropdown>
            <br />
            <Dropdown
              labelName="Departments"
              options={datas.departments.data}
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
          options={location}
          selectedValue={formData.location.toString()}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        ></Dropdown>
        <br />
        <Dropdown
          labelName="Interview Stages"
          options={interviewStages}
          selectedValue={formData.stage_name}
          onChange={(e) =>
            setFormData({ ...formData, stage_name: e.target.value })
          }
        ></Dropdown>
        <br />

        <div className="card-input--btnPlus">
          {data.length < 4 && (
            <Button
              type="button"
              onClick={handleAdd}
              text="+"
              btnColor=""
              className="txt-light btn-primary btnRight"
            />
          )}
        </div>

        {data.map((interviewerId, index) => (
          <div key={index} className="card-input--box">
            <div className="card-input--first">
              <div className="card-input--language">
                {/* <Dropdown
                  labelName="Interviewers"
                  options={interviewer_id}
                  value={interviewerId}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index] = e.target.value;
                    setData(updatedData);
                  }}
                /> */}
                <Dropdown
                  labelName="Interviewers"
                  options={interviewer_id} // Change to interviewer_id instead of interviewer_id.data
                  selectedValue={formData.interviewerId}
                  onChange={(e) => {
                    const updatedData = [...data];
                    console.log(updatedData);
                    updatedData[index] = e.target.value;
                    setData(updatedData);
                  }}
                />
              </div>
              <div className="card-input--btnMinus">
                {data.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemove(index)}
                    text="-"
                    className="txt-light btn-default btnRight"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <Button type="submit" text="Create" className="txt-light btn-default" />
      </form>
    </div>
  );
};
