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
  const getTopicName = (id) => {
    let topic = "";

    switch (id) {
      case 1:
        topic = "Language Proficiency";
        break;
      case 2:
        topic = "Interest on Company&Job";
        break;
      case 3:
        topic = "Sociability";
        break;
      case 4:
        topic = "Work Experience";
        break;
      case 5:
        topic = "Self Confidence";
        break;
      case 6:
        topic = "Qualification";
        break;
      default:
        topic = "Unknown Topic";
    }

    return topic;
  };
  const getRateName = (id) => {
    let rate = "";
    switch (id) {
      case 1:
        rate = "Well";
        break;
      case 2:
        rate = "Goood";
        break;
      case 3:
        rate = "Acceptable";
        break;
      case 4:
        rate = "Unacceptable";
        break;
      case 5:
        rate = "Nill";
        break;
      default:
        rate = "Unknown Rate";
    }
    return rate;
  };

  const renderStages = () => {
    return data.interview.map((interview) => (
      <div key={interview.id}>
        <button
          key={interview.id}
          onClick={() => setSelectedStage(interview)}
          className={selectedStage === interview ? "active" : ""}
        >
          {interview.interview_stage.stage_name == "1"
            ? "First Interview"
            : interview.interview_stage.stage_name == "2"
            ? "Technical Skill"
            : "Second Interview"}
        </button>
        <div>
          {interview.interview_assign.map((assign) => (
            <div key={assign.id}>
              <p>Interviewer: {assign.interviewer.name}</p>
              <p>Department: {assign.interviewer.department.name}</p>
              <p>Position: {assign.interviewer.position.name}</p>
              {selectedStage === interview && (
                <div>
                  {assign.assessment.map((assessment) => (
                    <div key={assessment.id}>
                      {assessment.assessment_result.map((result) => (
                        <p key={result.id}>
                          Topic: {getTopicName(result.topic_id)}
                          :Rate:{getRateName(result.rate_id)}
                        </p>
                      ))}
                      {assign.remarks.map((remark) => (
                        <div key={remark.id}>
                          <p>Comment: {remark.comment}</p>
                          <p>
                            Grade:{" "}
                            {remark.grade === 1
                              ? "A"
                              : remark.grade === 2
                              ? "B"
                              : "C"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const candidate = data.candidate;
  return (
    <div>
      <h2>Candidate Details</h2>

      {isSuccess && Object.keys(data).length > 0 ? (
        <>
          <p>Name: {candidate.name}</p>
          <p>Email: {candidate.email}</p>
          <p>
            Gender:
            {candidate.gender == "1"
              ? "Male"
              : candidate.gender == "2"
              ? "Female"
              : "Non Binary"}
          </p>
          <p>Phone Number:{candidate.phone_number}</p>
          <p>Residential Address:{candidate.residential_address}</p>
          <p>Date Of Birth{candidate.date_of_birth}</p>
          <p>CV Path:{candidate.cv_path}</p>
          <p>
            Willingness To Travel:{" "}
            {candidate.willingness_to_travel ?? "Not mentioned"}
          </p>

          <p>Expected Salary:{candidate.expected_salary ?? "Not mentioned"}</p>
          <p>
            Last Earned salary:{candidate.expected_salary ?? "Not mentioned"}
          </p>
          <p>
            Earliest Starting Date:
            {candidate.earliest_starting_date ?? "Not mentioned"}
          </p>
          {/* <p>Applied Position:{candidate.position.name}</p>
          <p>Agency Name:{candidate.agency.name}</p> */}

          <div>
            {candidate.specific_languages &&
            candidate.specific_languages.length > 0 ? (
              candidate.specific_languages.map((language) => (
                <div key={language.id}>
                  <p>
                    Language:{language.devlanguage.name}
                    Experience:{language.experience} Months
                  </p>
                </div>
              ))
            ) : (
              <p>No Language is Not provided</p>
            )}
          </div>

          <div>{renderStages()}</div>
          {selectedStage && (
            <div>
              <hr />
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
