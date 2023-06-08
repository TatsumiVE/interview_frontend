import { Button } from "bootstrap";
import { useState } from "react";

export const StageFilter = () => {
  const [stageFilter, setStageFilter] = useState(0);
  return (
    <>
      <div className="custom-stage">
        <Button
          type="button"
          onClick={() => setStageFilter(0)}
          className={`btn-primary txt-light ${
            stageFilter === 0 ? "active" : ""
          }`}
          text="All"
        />
      </div>
      <div className="custom-stage">
        <Button
          type="button"
          onClick={() => setStageFilter(1)}
          className={`btn-primary txt-light ${
            stageFilter === 1 ? "active" : ""
          }`}
          text="Stage One"
        />
      </div>
      <div className="custom-stage">
        <Button
          type="button"
          onClick={() => setStageFilter(2)}
          className={`btn-primary txt-light ${
            stageFilter === 2 ? "active" : ""
          }`}
          text="Stage Two"
        />
      </div>
      <div className="custom-stage">
        <Button
          type="button"
          onClick={() => setStageFilter(3)}
          className={`btn-primary txt-light ${
            stageFilter === 3 ? "active" : ""
          }`}
          text="Stage Three"
        />
      </div>
    </>
  );
};
