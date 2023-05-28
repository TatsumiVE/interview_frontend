import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export const CStages = () => {
  const { interview } = useOutletContext();

  const lastStage = interview.reduce((first, second) =>
    first.interview_stage.stage_name > second.interview_stage.stage_name
      ? first
      : second
  );

  const [stage, setStage] = useState(lastStage.interview_stage.stage_name);

  const [currentStage] = interview.filter(
    (i) => i.interview_stage.stage_name === stage
  );

  const hasStage = (v) => v <= lastStage.interview_stage.stage_name;

  const activeClass = (v) => `${stage === v ? "nav-active" : ""}`;

  return (
    <div className="c-stage">
      <div className="stage-nav">
        <div className="nav-box">
          <div className="nav-item">
            <div
              onClick={() => setStage(1)}
              disabled={!hasStage(1)}
              className={`${activeClass(1)} "nav-item`}
            >
              First Stage
            </div>
          </div>
        </div>
        <div className="nav-box">
          <div className="nav-item">
            <div
              onClick={() => setStage(2)}
              disabled={!hasStage(2)}
              className={`${activeClass(2)} "nav-item`}
            >
              Second Stage
            </div>
          </div>
        </div>
        <div className="nav-box">
          <div className="nav-item">
            <div
              onClick={() => setStage(3)}
              disabled={!hasStage(3)}
              className={`${activeClass(3)} "nav-item`}
            >
              Final Stage
            </div>
          </div>
        </div>
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
