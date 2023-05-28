import {
  Link,
  NavLink,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import candidateService from "../../services/candidateService";
import { useAuth } from "../../store/AuthContext";

export const CandidateDetails = () => {
  // const { id } = useParams();
  // const [selectedStage, setSelectedStage] = useState();
  // const {
  //   data: data,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useQuery(["get", "candidate", id], getCandidateDetails);
  // if (isLoading) return "Loading...";
  // if (isError) return "Something went wrong";
  // if (error) return "An error has occurred: " + error.message;
  // const getTopicName = (id) => {
  //   let topic = "";
  //   switch (id) {
  //     case 1:
  //       topic = "Language Proficiency";
  //       break;
  //     case 2:
  //       topic = "Interest on Company&Job";
  //       break;
  //     case 3:
  //       topic = "Sociability";
  //       break;
  //     case 4:
  //       topic = "Work Experience";
  //       break;
  //     case 5:
  //       topic = "Self Confidence";
  //       break;
  //     case 6:
  //       topic = "Qualification";
  //       break;
  //     default:
  //       topic = "Unknown Topic";
  //   }
  //   return topic;
  // };
  // const getRateName = (id) => {
  //   let rate = "";
  //   switch (id) {
  //     case 1:
  //       rate = "Well";
  //       break;
  //     case 2:
  //       rate = "Goood";
  //       break;
  //     case 3:
  //       rate = "Acceptable";
  //       break;
  //     case 4:
  //       rate = "Unacceptable";
  //       break;
  //     case 5:
  //       rate = "Nill";
  //       break;
  //     default:
  //       rate = "Unknown Rate";
  //   }
  //   return rate;
  // };
  // const renderStages = () => {
  //   return data.interview.map((interview) => (
  //     <div label={interview.id}>
  //       <button
  //         label={interview.id}
  //         onClick={() => setSelectedStage(interview)}
  //         className={selectedStage === interview ? "active" : ""}
  //       >
  //         {interview.interview_stage.stage_name == "1"
  //           ? "First Interview"
  //           : interview.interview_stage.stage_name == "2"
  //           ? "Technical Skill"
  //           : "Second Interview"}
  //       </button>
  //       <div>
  //         {interview.interview_assign.map((assign) => (
  //           <div label={assign.id}>
  //             <p>Interviewer: {assign.interviewer.name}</p>
  //             <p>Department: {assign.interviewer.department.name}</p>
  //             <p>Position: {assign.interviewer.position.name}</p>
  //             {selectedStage === interview && (
  //               <div>
  //                 {assign.assessment.map((assessment) => (
  //                   <div label={assessment.id}>
  //                     {assessment.assessment_result.map((result) => (
  //                       <p label={result.id}>
  //                         Topic: {getTopicName(result.topic_id)}
  //                         :Rate:{getRateName(result.rate_id)}
  //                       </p>
  //                     ))}
  //                     {assign.remarks.map((remark) => (
  //                       <div label={remark.id}>
  //                         <p>Comment: {remark.comment}</p>
  //                         <p>
  //                           Grade:{" "}
  //                           {remark.grade === 1
  //                             ? "A"
  //                             : remark.grade === 2
  //                             ? "B"
  //                             : "C"}
  //                         </p>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   ));
  // };
  // const candidate = data.candidate;
  // return (
  //   <div>
  //     <h2>Candidate Details</h2>
  //     {isSuccess && Object.labels(data).length > 0 ? (
  //       <>
  //         <p>Name: {candidate.name}</p>
  //         <p>Email: {candidate.email}</p>
  //         <p>
  //           Gender:
  //           {candidate.gender == "1"
  //             ? "Male"
  //             : candidate.gender == "2"
  //             ? "Female"
  //             : "Non Binary"}
  //         </p>
  //         <p>Phone Number:{candidate.phone_number}</p>
  //         <p>Residential Address:{candidate.residential_address}</p>
  //         <p>Date Of Birth{candidate.date_of_birth}</p>
  //         <p>CV Path:{candidate.cv_path}</p>
  //         <p>
  //           Willingness To Travel:{" "}
  //           {candidate.willingness_to_travel ?? "Not mentioned"}
  //         </p>
  //         <p>Expected Salary:{candidate.expected_salary ?? "Not mentioned"}</p>
  //         <p>
  //           Last Earned salary:{candidate.expected_salary ?? "Not mentioned"}
  //         </p>
  //         <p>
  //           Earliest Starting Date:
  //           {candidate.earliest_starting_date ?? "Not mentioned"}
  //         </p>
  //         {/* <p>Applied Position:{candidate.position.name}</p>
  //         <p>Agency Name:{candidate.agency.name}</p> */}
  //         <div>
  //           {candidate.specific_languages &&
  //           candidate.specific_languages.length > 0 ? (
  //             candidate.specific_languages.map((language) => (
  //               <div label={language.id}>
  //                 <p>
  //                   Language:{language.devlanguage.name}
  //                   Experience:{language.experience} Months
  //                 </p>
  //               </div>
  //             ))
  //           ) : (
  //             <p>No Language is Not provided</p>
  //           )}
  //         </div>
  //         <div>{renderStages()}</div>
  //         {selectedStage && (
  //           <div>
  //             <hr />
  //             <p>Interview Stage: {selectedStage.interview_stage.stage_name}</p>
  //             <p>
  //               Interview Date: {selectedStage.interview_stage.interview_date}
  //             </p>
  //             <p>
  //               Interview Time: {selectedStage.interview_stage.interview_time}
  //             </p>
  //             <p>Location: {selectedStage.interview_stage.location}</p>
  //             <p>Interview Summarize: {selectedStage.interview_summarize}</p>
  //             <p>
  //               Interview Result Date: {selectedStage.interview_result_date}
  //             </p>
  //             <p>Interview Result: {selectedStage.interview_result}</p>
  //             <p>Record Path: {selectedStage.interview_stage.record_path}</p>
  //           </div>
  //         )}
  //       </>
  //     ) : (
  //       <p>Candidate details not found.</p>
  //     )}
  //   </div>
  // );

  const { token } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({});

  const {
    data: candidateData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery(["get", "candidate-detail", id], () =>
    candidateService.get(id, token)
  );
  console.log("ddetails");
  useEffect(() => {
    if (isSuccess) {
      setData(candidateData.data);
    }
  }, [candidateData, isSuccess]);

  if (isLoading) return "Loading....";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  const activeClassName = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="candidate-detail">
      <div className="c-header">
        <img className="logo" src="" />
        <div className="info">
          <p className="name">{data.candidate?.name}</p>
          <p className="job">Junior web developer</p>
        </div>
      </div>
      <div className="c-nav">
        <NavLink to="details" className={activeClassName}>
          DETAILS
        </NavLink>
        <NavLink to="cv" className={activeClassName}>
          CV
        </NavLink>
        <NavLink to="stages" className={activeClassName}>
          STAGES
        </NavLink>
        <NavLink to="interviews" className={activeClassName}>
          INTERVIEWS
        </NavLink>
      </div>
      <div className="c-main">
        <Outlet context={data} />
      </div>
    </div>
  );
};

export const CDetails = () => {
  const { candidate } = useOutletContext();
  return (
    <div className="c-details">
      <div className="wrapper">
        <h2>
          Basic Information
          <span>
            <Link to="">Edit info</Link>
          </span>
        </h2>
        <div className="panel">
          <div className="field">
            <p className="label">Name</p>
            <p>{candidate?.name}</p>
          </div>
          <div className="field">
            <p className="label">Email</p>
            <p>{candidate?.email}</p>
          </div>
          <div className="field">
            <p className="label">Candidate ID</p>
            <p>{candidate?.id}</p>
          </div>
          <div className="field">
            <p className="label">Phone</p>
            <p>{candidate?.phone_number}</p>
          </div>
          <div className="field">
            <p className="label">Agency</p>
            <p>{candidate?.agency_id}</p>
          </div>
          <div className="field">
            <p className="label">Social Link</p>
            <p>https://www.facebook.com/username</p>
          </div>
          <div className="field">
            <p className="label">Address</p>
            <p>{candidate?.residential_address}</p>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <h2>
          Professional Details
          <span>
            <Link to="">Edit info</Link>
          </span>
        </h2>
        <div className="panel">
          <div className="field">
            <p className="label">Current Job Title</p>
            <p>{candidate?.position_id}</p>
          </div>
          <div className="field">
            <p className="label">Highest Qualification Hand</p>
            <p>Pass Grade-4</p>
          </div>
          <div className="field">
            <p className="label">Expected Salary</p>
            <p>{candidate?.expected_salary || "-"}</p>
          </div>
          <div className="field">
            <p className="label">Current Salary</p>
            <p>{candidate?.last_salary || "-"}</p>
          </div>
          <div className="field">
            <p className="label">Experience in Years</p>
            <p>0</p>
          </div>
          <div className="field">
            <p className="label">Additional info</p>
            <p>no info available</p>
          </div>
          <div className="field">
            <p className="label">Skills Set</p>
            <p>no skills exit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CCv = () => (
  <div className="c-cv">
    <iframe
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowfullscreen
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=API_KEY
  &q=Space+Needle,Seattle+WA"
    ></iframe>
  </div>
);

export const CStages = () => {
  const { interview } = useOutletContext();

  const lastStage = interview?.reduce((first, second) =>
    first.interview_stage.stage_name > second.interview_stage.stage_name
      ? first
      : second
  );
  const [stage, setStage] = useState(lastStage.interview_stage.stage_name);

  // console.log(interview, "lastStage => ", lastStage, "stage => ", stage);

  const [currentStage] = interview.filter(
    (i) => i.interview_stage.stage_name === stage
  );

  console.log("current => ", currentStage);

  return (
    <div>
      <div>
        <button
          onClick={() => setStage(1)}
          disabled={1 > lastStage.interview_stage.stage_name}
          className={stage === 1 ? "active-stage" : ""}
        >
          Stage 1
        </button>
        <button
          onClick={() => setStage(2)}
          disabled={2 > lastStage.interview_stage.stage_name}
          className={stage === 2 ? "active-stage" : ""}
        >
          Stage 2
        </button>
        <button
          onClick={() => setStage(3)}
          disabled={3 > lastStage.interview_stage.stage_name}
          className={stage === 3 ? "active-stage" : ""}
        >
          Stage 3
        </button>
      </div>
      <div>
        {currentStage.interview_assign.map((i) => (
          <div key={i.id}>
            <p>Name: {i.interviewer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CInterviews = () => {
  const { interview } = useOutletContext();
  console.log(interview);
  return <div>adskfjsjfasdklfd</div>;
};
