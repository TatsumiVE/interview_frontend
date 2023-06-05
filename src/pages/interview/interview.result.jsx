import { useState } from "react";
import {
  Input,
  Button,
  TextArea,
  InputCheckbox,
  ButtonLink,
} from "../../components/utilites";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const InterviewResult = () => {
  const [interview_result_date, setInterviewResultDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [record_path, setRecordPath] = useState("");
  const [interview_result, setResult] = useState();
  const [interview_summarize, setInterviewSummarize] = useState("");
  const { token } = useAuth();
  const [errors, setErrors] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { candidateId, interviewId, candidateName } = state;

  const createInterviewResult = async () => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/interview-process/result/${candidateId}/${interviewId}`,
      {
        interview_result_date,
        interview_result,
        interview_summarize,
        record_path,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
  const { mutate: interviewResult } = useMutation({
    mutationKey: ["post", "interview-process", "result"],
    mutationFn: createInterviewResult,
    onSuccess: () => {
      navigate("/interview");
    },
    onError: (error) => {
      const { response } = error;
      setErrors(response.data.data);
      console.log(response.data.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    interviewResult();
  };

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Interview Result Form</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="card-min__form">
          <div className="input-name">
            <span className="txt-default">Candidate Name: </span>
            {candidateName}
          </div>
          <div className="input-group">
            <Input
              labelName="Interview Result Date"
              type="date"
              name="interview_result_date"
              value={interview_result_date}
              onChange={(e) => setInterviewResultDate(e.target.value)}
              errorMessage="*"
            />
            {errors?.interview_result_date && (
              <span className="txt-danger validated-error">
                {errors?.interview_result_date}
              </span>
            )}
          </div>
          <div className="input-group">
            <TextArea
              labelName="Interview Summarize"
              name="interview_summarize"
              value={interview_summarize}
              placeholder=" Enter interview summarize..."
              onChange={(e) => setInterviewSummarize(e.target.value)}
              errorMessage="*"
            />
            {errors?.interview_summarize && (
              <span className="txt-danger validated-error">
                {errors?.interview_summarize}
              </span>
            )}
          </div>

          <div className="radio-group--modify">
            <InputCheckbox
              labelName="Pass"
              type="radio"
              name="result"
              placeholder=""
              value="1"
              onChange={(e) => setResult(e.target.value)}
            />
            <div className="radio-fail">
              <InputCheckbox
                labelName="Fail"
                type="radio"
                name="result"
                placeholder=""
                value="0"
                onChange={(e) => setResult(e.target.value)}
              />
            </div>

            <span className="txt-danger star">*</span>

            {errors?.interview_result && (
              <span className="txt-danger validated-error interview_result">
                {errors?.interview_result}
              </span>
            )}
          </div>

          <div className="input-group">
            <Input
              labelName="Record Path"
              type="text"
              name="record_path"
              placeholder="Enter Record Path"
              onChange={(e) => setRecordPath(e.target.value)}
              errorMessage="*"
            />
            {errors?.record_path && (
              <span className="txt-danger validated-error">
                {errors?.record_path}
              </span>
            )}
          </div>

          <div className="button-group--user">
            <Button
              type="submit"
              text="Create"
              className="txt-light btn-primary"
            />
            <ButtonLink
              type="button"
              className="btn-default cancel"
              route={"/interview"}
              text="Cancel"
              linkText="txt-light txt-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
