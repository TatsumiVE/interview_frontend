import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Rating from "../../components/utilites/rating";

export const CStages = () => {
  const [show, setShow] = useState({ id: null, isCollapse: true });

  const { interview } = useOutletContext();

  const lastStage = interview.reduce(
    (first, second) =>
      first?.interview_stage?.stage_name > second?.interview_stage?.stage_name
        ? first
        : second,
    {}
  );

  const [stage, setStage] = useState(
    lastStage?.interview_stage?.stage_name || 0
  );

  const [currentStage] = interview.filter(
    (i) => i?.interview_stage?.stage_name === stage
  );

  const hasStage = (v) => v <= lastStage?.interview_stage?.stage_name;

  const activeClass = (v) => `${stage === v ? "nav-active" : ""}`;

  const grades = ["A", "B", "C"];

  const rates = ["Well", "Good", "Acceptable", "UnAcceptable", "Nill"];

  const topics = [
    "Language Proficiency",
    "Interest on Company&Job",
    "Sociability",
    "Work Experience",
    "Self Confidence",
    "Qualification",
  ];

  return (
    <div className="c-stage">
      <div className="stage-nav">
        <div
          onClick={() => setStage(1)}
          disabled={!hasStage(1)}
          className={`${activeClass(1)} nav-box`}
        >
          <div className="nav-item">First Stage</div>
        </div>
        <div
          onClick={() => setStage(2)}
          disabled={!hasStage(2)}
          className={`${activeClass(2)} nav-box`}
        >
          <div className="nav-item">Second Stage</div>
        </div>
        <div
          onClick={() => setStage(3)}
          disabled={!hasStage(3)}
          className={`${activeClass(3)} nav-box`}
        >
          <div className="nav-item">Final Stage</div>
        </div>
      </div>

      {interview[0] ? (
        <>
          <div className="info-card">
            <div className="info-header">
              <h2>Detail</h2>
            </div>
            <div className="info-main">
              <div className="field">
                <p className="label">Current Stage</p>
                <p>
                  {currentStage.interview_stage.stage_name == 1
                    ? "First Interview"
                    : currentStage.interview_stage.stage_name == 2
                    ? "Technical Interview"
                    : "Final Interview"}
                </p>
              </div>
              <div className="field">
                <p className="label">Result</p>
                <p>
                 
                  { currentStage.interview_result == 1
                    ? "Pass"
                    : "Fail"
                   }
                </p>
              </div>
              <div className="field">
                <p className="label">Result Date</p>
                <p>
                  {currentStage.interview_result_date ??
                    "Interview result date is not defined !"}
                </p>
              </div>
              <div className="field">
                <p className="label">Record Path</p>
                <p>
                  {currentStage.record_path ??
                    "Interview record is not uploaded !"}
                </p>
              </div>
              <div className="field">
                <p className="label">Summary</p>
                <p>
                  {currentStage.interview_summarize ??
                    "Interview summary is not defined !"}
                </p>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <h2>Interviewer</h2>
            </div>
            <div className="info-main block">
              {currentStage?.interview_assign.map((i) => (
                <div key={i.id} className="info-row">
                  <div className="info-row-header">
                    <div className="info-row__profile">
                      <img src={""} />
                      <div>
                        <p>{i.interviewer.name}</p>
                        <p className="label">
                          {i.interviewer.position.name}
                          {" @ "}
                          {i.interviewer.department.name} Department
                        </p>
                      </div>
                    </div>
                    <button
                      className="info-row__toggle"
                      onClick={() => {
                        setShow((prev) => ({
                          id: i.id,
                          isCollapse:
                            prev.id === i.id ? !prev.isCollapse : false,
                        }));
                      }}
                    >
                      {show.id !== i.id
                        ? "Show"
                        : show.id === i.id && show.isCollapse
                        ? "Show"
                        : "Hide"}
                    </button>
                  </div>
                  {show.id === i.id && !show.isCollapse && (
                    <div className="info-row-collapse">
                      {i.remarks[0]?.grade ? (
                        <>
                          <p>
                            <span>GRADE</span>
                            <span style={{ color: "#d7b700" }}>
                              {grades[i.remarks[0].grade - 1]}
                            </span>
                          </p>
                          {i.assessment[0].assessment_result.map((r) => (
                            <div key={r.id}>
                              <span>{topics[r.topic_id - 1]}</span>
                              <span>
                                <Rating value={r.rate_id}>
                                  <span className="label">
                                    {rates[r.rate_id - 1]}
                                  </span>
                                </Rating>
                              </span>
                            </div>
                          ))}
                          <p>
                            <span>Comment</span>
                            {i.remarks[0].comment}
                          </p>
                        </>
                      ) : (
                        "No Comment"
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        "No Stage exits."
      )}
    </div>
  );
};
