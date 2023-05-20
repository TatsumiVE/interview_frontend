import { useState } from "react";
import { Input, Button } from "../components";
export const InterviewResult = () => {
  const [result, setResult] = useState("");
  const [interview_summarize, setSummarize] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <p>Candidate Name</p>
        <Input
          labelName="Interview Result Date"
          type="date"
          name="interview_result_date"
          placeholder="Enter Interview result Date"
        />
        <p> Interview Stages ID</p>
        <textarea
          name="interview_summarize"
          value={interview_summarize}
          onChange={(e) => setSummarize(e.target.value)}
        >
          Interview Summarize
        </textarea>
        <Input
          labelName="Pass"
          type="radio"
          name="result"
          placeholder=""
          value="1"
          checked={result === "1"}
          onChange={(e) => setResult(e.target.value)}
        />
        <Input
          labelName="Fail"
          type="radio"
          name="result"
          placeholder=""
          value="0"
          checked={result === "0"}
          onChange={(e) => setResult(e.target.value)}
        />
        <p> Candidate ID</p>
        <Button type="submit" text="Cancle" btnColor="" />
        <Button type="submit" text="Submit" btnColor="" />
      </form>
    </>
  );
};
