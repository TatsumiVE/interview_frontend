import { useQuery, useMutation } from "react-query";
import { Button, Dropdown } from "../../components";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useAuth } from "../../store/AuthContext";

export const InterviewAssessment = () => {
  const { state } = useLocation();
  const { candidateId, interviewerId } = state;
  const [comment, setComment] = useState("");
  const [grade, setGrade] = useState("");
  const { token } = useAuth();
  const grades = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];

  const getAssessmentInfo = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/interview-process/${candidateId}/${interviewerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const getTopics = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/topics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  };

  const getRates = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/rates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  const postAssessment = async (e) => {
    e.preventDefault();
    const selectedTopics = getSelectedTopics();

    const response = await axios.post(
      "http://127.0.0.1:8000/api/interviews",
      {
        interview_stage_id: assessment.interview.interview_stage.id,
        candidate_id: assessment.interview.candidate.id,
        interview_assign_id: assessment.id,
        comment: comment,
        grade: grade,
        data: selectedTopics,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const { mutate: createInterviewAssessment } = useMutation(postAssessment, {
    onSuccess: () => {
      console.log("Assessment submitted successfully");
    },
  });

  if (assessmentIsLoading || topicsIsLoading || ratesIsLoading)
    return "Loading...";
  if (assessmentIsError || topicsIsError || ratesIsError)
    return "Something went wrong";
  if (!assessment || !topics || !rates) return null;

  const data = assessment.interview;
  const interviewStage = assessment.interview.interview_stage.stage_name;

  const getSelectedTopics = () => {
    const selectedTopics = [];
    topics.forEach((topic) => {
      const selectedRate = document.querySelector(
        `input[name="rate-${topic.id}"]:checked`
      );
      if (selectedRate) {
        selectedTopics.push({
          topic_id: topic.id,
          rate_id: selectedRate.value,
        });
      }
    });
    return selectedTopics;
  };

  const renderRateOptions = (topicId) => {
    return rates.map((rate) => (
      <label key={rate.id}>
        {rate.name}
        <input type="radio" name={`rate-${topicId}`} value={rate.id} />
      </label>
    ));
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2>Interview Assessment Form</h2>
      </div>
      <form onSubmit={createInterviewAssessment}>
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
          </div>
          <div className="card__card-question">
            <div className="question-title">
              <h3 className="topic">Questions</h3>
              <h3 className="rate">Rates</h3>
            </div>
            <div className="question-body">
              <div className="question-topic">
                {topics.map((topic) => (
                  <React.Fragment key={topic.id}>
                    <span>{topic.name}</span>
                    <span className="question-rate">
                      {renderRateOptions(topic.id)}
                    </span>
                    <br />
                    <br />
                  </React.Fragment>
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
              <h3>{assessment.interviewer.department.name}</h3>
            </div>
            <div>
              <h3 className="txt-default">Position</h3>
              <h3>{assessment.interviewer.position.name}</h3>
            </div>
          </div>
          <div className="box">
            <textarea
              name="comment"
              className="commentBox"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <Dropdown
              labelName="Grades"
              options={grades}
              selectedValue={grade}
              onChange={(e) => setGrade(e.target.value)}
            />

            <br />
          </div>
          <div className="btn-group">
            <Button
              type="submit"
              className="txt-light btn-primary"
              text="Create"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
