import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";

export const CandidateDetails = () => {
  const { id } = useParams();

  const [selectedStage, setSelectedStage] = useState();
  const getCandidateDetails = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/candidate-detail/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  const {
    data: data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery(["get", "candidate", id], getCandidateDetails);

  if (isLoading) return "Loading...";

  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  const candidate = data[0];

  const renderStages = () => {
    return candidate.interviews.map((interview) => (
      <div key={interview.id}>
        <button
          key={interview.id}
          onClick={() => setSelectedStage(interview)}
          className={selectedStage === interview ? "active" : ""}
        >
          {interview.interview_stage.stage_name == "1"
            ? "Screening"
            : interview.interview_stage.stage_name == "2"
            ? "Technical Skill"
            : "POSITION-RELATED QUESTIONS"}
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Candidate Details</h2>
      {isSuccess && data.length > 0 ? (
        <>
          <p>Name: {candidate.name}</p>
          <p>Email: {candidate.email}</p>
          <p>
            Gender:
            {candidate.gender == "1"
              ? "Male"
              : candidate.gender == "2"
              ? "Female"
              : "No Boundry"}
          </p>
          <p>Phone Number:{candidate.phone_number}</p>
          <p>Residential Address:{candidate.residential_address}</p>
          <p>Date Of Birth{candidate.date_of_birth}</p>
          <p>CV Path:{candidate.cv_path}</p>
          <p>Willingness To Travel:{candidate.willingness_to_travel}</p>
          <p>Expected Salary:{candidate.expected_salary}</p>
          <p>Last Earned salary:{candidate.expected_salary}</p>
          <p>Earliest Starting Date:{candidate.earliest_starting_date}</p>
          <p>Applied Position:{candidate.position.name}</p>
          <p>Agency Name:{candidate.agency.name}</p>

          <h3>Interview Stages</h3>
          <div>
            {candidate.specific_languages &&
            candidate.specific_languages.length > 0 ? (
              candidate.specific_languages.map((language) => (
                <div key={language.id}>
                  <p>Experience:{language.experience}</p>
                  <p>Language:{language.devlanguage.name}</p>
                </div>
              ))
            ) : (
              <p>No Language is Not provided</p>
            )}
          </div>
          <div>{renderStages()}</div>
          {selectedStage && (
            <div>
              <p>Interview Stage: {selectedStage.interview_stage.stage_name}</p>
              <p>
                Interview Date: {selectedStage.interview_stage.interview_date}
              </p>
              <p>
                Interview Time: {selectedStage.interview_stage.interview_time}
              </p>
              <p>Location: {selectedStage.interview_stage.location}</p>
              <p>Interview Summarize: {selectedStage.interview_summarize}</p>
              <p>
                Interview Result Date: {selectedStage.interview_result_date}
              </p>
              <p>Interview Result: {selectedStage.interview_result}</p>
              <p>Record Path: {selectedStage.interview_stage.record_path}</p>
            </div>
          )}
        </>
      ) : (
        <p>Candidate details not found.</p>
      )}
    </div>
  );
};
