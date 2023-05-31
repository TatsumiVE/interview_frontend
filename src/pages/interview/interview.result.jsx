import { useState } from "react";
import { Input, Button } from "../../components/utilites";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
export const InterviewResult = () => {
  const [interview_result_date, setInterviewResultDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [record_path, setRecordPath] = useState("");
  const [interview_result, setResult] = useState("1");
  const [interview_summarize, setInterviewSummarize] = useState("");
  const { token } = useAuth();
  const { state } = useLocation();
  const { candidateId, stageId, candidateName } = state;
  const createInterviewResult = async () => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/interview-process/result/${candidateId}/${stageId}`,
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    interviewResult();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <p>Candidate Name: {candidateName}</p>
        <Input
          labelName="Interview Result Date"
          type="date"
          name="interview_result_date"
          value={interview_result_date}
          onChange={(e) => setInterviewResultDate(e.target.value)}
        />
        <p>Interview Summarize</p>
        <textarea
          name="interview_summarize"
          value={interview_summarize}
          onChange={(e) => setInterviewSummarize(e.target.value)}
        >
          Interview Summarize
        </textarea>
        <Input
          labelName="Pass"
          type="radio"
          name="result"
          placeholder=""
          value="1"
          checked={interview_result === "1"}
          onChange={(e) => setResult(e.target.value)}
        />
        <Input
          labelName="Fail"
          type="radio"
          name="result"
          placeholder=""
          value="0"
          checked={interview_result === "2"}
          onChange={(e) => setResult(e.target.value)}
        />
        <Input
          labelName="Record Path"
          type="text"
          name="record_path"
          placeholder="Enter Record Path"
          onChange={(e) => setRecordPath(e.target.value)}
        />

        <Button type="submit" className="txt-light btn-primary" text="Create" />
      </form>
    </>
  );
};
