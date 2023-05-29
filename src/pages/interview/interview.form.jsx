import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Dropdown, Button } from "../../components";
import { useAuth } from "../../store/AuthContext";

export const InterviewCreate = () => {
  const { id, stageId } = useParams();
  const [data, setData] = useState([{}]);
  // const navigate = useNavigate();
  const [interviewer_id, setInterviewers] = useState([]);
  const { token } = useAuth();
  const interviewStages = [
    { id: 1, name: "First Interview" },
    { id: 2, name: "Technical Interview" },
    { id: 3, name: "Final Interview" },
  ];
  const selectedStageId = parseInt(stageId, 10) + 1;
  const [formData, setFormData] = useState({
    candidate_id: id,
    stage_name:
      interviewStages.find((stage) => stage.id === selectedStageId)?.id || "",
    interview_date: "",
    interview_time: "",
    location: "",
  });
  const createInterview = async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/interview-process",
      {
        ...formData,
        interviewer_id: formData.interviewer_id.map((id) => parseInt(id, 10)),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const { mutate: interviewProcess } = useMutation({
    mutationKey: ["post", "interview-process"],
    mutationFn: createInterview,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = data.map((row) => row.interviewer_id);

    const updatedFormData = {
      ...formData,
      interviewer_id: requestData,
    };
    console.log(updatedFormData);
    interviewProcess(updatedFormData);

    // navigate("/interview?message=interview");
  };

  const handleAdd = () => {
    setData([...data, { interviewer_id: "" }]); // Replace "" with a valid interviewer_id
  };
  const handleRemove = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const fetchData = async () => {
    try {
      const interviewerResponse = await axios.get(
        "http://localhost:8000/api/interviewers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterviewers(interviewerResponse.data.data);
    } catch (error) {
      return error.message;
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
        <Dropdown
          labelName="Interview Stages"
          options={interviewStages.map((stage) => ({
            id: stage.id,
            name: stage.name,
            selected: stage.id === selectedStageId,
            disabled: stage.id !== selectedStageId,
          }))}
          selectedValue={selectedStageId.toString()}
          className="custom-dropdown"
        />

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
                <Dropdown
                  labelName="Interviewers"
                  options={interviewer_id}
                  selectedValue={formData.interviewerId}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].interviewer_id = e.target.value;
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
