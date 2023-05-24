import { useQuery } from "react-query";
import { Input, Button } from "../../components";
import axios from "axios";
import { useParams } from "react-router-dom";

export const InterviewAssessment = () => {
  const { candidateId, interviewerId } = useParams();

  const getAssessmentInfo = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/interview-process/${candidateId},${interviewerId}`
    );
    return response.data.data;
  };
  const getTopics = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/topics");
    return response.data.data;
  };

  const getRates = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/rates");
    return response.data.data;
  };

  const postAssessment = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/interview-process"
    );
    return response.data.data;
  };

  const {
    data: assessment,
    isLoading: assessmentIsLoading,
    isSuccess: assessmentIsSuccess,
    isError: assessmentIsError,
    error: assessmentError,
  } = useQuery(["get", "interview-process"], getAssessmentInfo);

  const {
    data: topics,
    isLoading: topicsIsLoading,
    isSuccess: topicsIsSuccess,
    isError: topicsIsError,
    error: topicsError,
  } = useQuery(["get", "topics"], getTopics);

  const {
    data: rates,
    isLoading: ratesIsLoading,
    isSuccess: ratesIsSuccess,
    isError: ratesIsError,
    error: ratesError,
  } = useQuery(["get", "rates"], getRates);

  if (assessmentIsLoading || topicsIsLoading || ratesIsLoading)
    return "Loading...";
  if (assessmentIsError || topicsIsError || ratesIsError)
    return "Something went wrong";
  if (!assessment || !topics || !rates) return null;

  let data = assessment.interview;
  let interviewStage = assessment.interview.interview_stage.stage_name;
  return (
    <div className="card">
      <div className="card__header">
        <h2>Interview Assessment Form</h2>
      </div>
      <div className="card__body">
        <div className="card__txt">
          <div>
            <h3 className="txt-default">Candidate Name</h3>
            <h3>{data.candidate.name}</h3>
          </div>
          <div>
            <h3 className="txt-default">Applied Position</h3>
            <h3>{data.candidate.position.name}</h3>
          </div>
          <div>
            <h3 className="txt-default">Date</h3>
            <div>
              <input
                type="date"
                value={data.interview_stage.interview_date}
                disabled
              />
            </div>
            <div>
              <input
                type="time"
                value={data.interview_stage.interview_time}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="card__txt">
          <div>
            {interviewStage === 1
              ? "First Interview"
              : interviewStage === 2
              ? "Technical Interview"
              : "Final Interview"}
          </div>
          <div>
            <h3>
              {data.interview_stage.location === 1 ? "Online" : "In Person"}
            </h3>
          </div>
          <div>
            <input type="text" className="" placeholder="Enter record_path" />
          </div>
        </div>
        <div className="card__card-question">
          <div className="question-title">
            <h3 className="topic">Questions</h3>
            <h3 className="rate">Rates</h3>
          </div>
          <div className="question-body">
            <div className="question-topic">
              {topics.map((topic) => (
                <>
                  <span key={topic.id}>{topic.name}</span>
                  <span className="question-rate">
                    {rates.map((rate) => (
                      <label key={rate.id}>
                        {rate.name}
                        <input type="checkbox"></input>
                      </label>
                    ))}
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="card__txt">
          <div>
            <h3 className="txt-default">Interviewer Name</h3>
            <h3>{assessment.interviewer.name}</h3>
          </div>
          <div>
            <h3 className="txt-default">Department</h3>
            <h3></h3>
          </div>
          <div>
            <h3 className="txt-default">Position</h3>
            <h3>{assessment.interviewer.position_id}</h3>
          </div>
        </div>
        <div className="box">
          <textarea
            name="comment"
            className="commentBox"
            placeholder="Comment"
          ></textarea>
        </div>
        <div className="btn-group">
          <Button
            type="button"
            className="txt-light btn-primary"
            text="Submit"
          />
          <Button
            type="button"
            className="txt-light btn-default"
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};
