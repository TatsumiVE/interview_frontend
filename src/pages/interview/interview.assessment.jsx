import { useQuery, useMutation } from "react-query";
import { Button, ButtonLink, Dropdown, InputCheckbox } from "../../components";
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
      <>
        <InputCheckbox
          type="radio"
          name={`rate-${topicId}`}
          value={rate.id}
          placeholder=""
          onChange={(e) => setTravel(e.target.checked)}
          labelName={rate.name}
        />
      </>
    ));
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2>Interview Assessment Form</h2>
      </div>
      <form onSubmit={createInterviewAssessment} className="card__form">
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
            <h3>{data.interview_stage.interview_date}</h3>
          </div>
          <div>
            <h3 className="txt-default">Time</h3>
            <h3>{data.interview_stage.interview_time}</h3>
          </div>
        </div>
        <div className="card__txt">
          <div>
            <h3 className="txt-default">Interview Stage</h3>
            <h3>
              {interviewStage === 1
                ? "First Interview"
                : interviewStage === 2
                ? "Technical Interview"
                : "Final Interview"}
            </h3>
          </div>
          <div>
            <h3 className="txt-default">Interview Place</h3>
            <h3>
              {data.interview_stage.location === 1 ? "Online" : "In Person"}
            </h3>
          </div>
        </div>
        <div className="card__question">
          <div className="question__title">
            <h3 className="question__topic txt-default">Questions</h3>
            <h3 className="question__rate txt-default">
              Rates <span className="txt-danger">*</span>
            </h3>
          </div>
          <div className="question__body">
            {topics.map((topic) => (
              <React.Fragment key={topic.id}>
                <div className="question-card">
                  <div className="topic">{topic.name}</div>
                  <div className="rate radio-group">
                    {renderRateOptions(topic.id)}
                  </div>
                </div>
              </React.Fragment>
            ))}
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

        <label className="comment-label">
          Comment <span className="txt-danger">*</span>
        </label>
        <textarea
          name="comment"
          className="comment-box"
          placeholder=" Enter Your Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <Dropdown
          labelName="Grade"
          options={grades}
          selectedValue={grade}
          onChange={(e) => setGrade(e.target.value)}
          errorMessage="*"
        />

        <div className="button-group--user">
          <Button
            type="submit"
            className="txt-light btn-primary"
            text="Create"
          />
          <ButtonLink
            type="button"
            className="btn-default"
            route={"/interview"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
