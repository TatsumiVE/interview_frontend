import { useState } from "react";
import { CandidateTable, CandidateList } from "../components";

export const Candidate = () => {
  // eslint-disable-next-line no-unused-vars
  const [isTable, setIsTable] = useState(true);

  const data = [
    { avatar: "1", name: "Mg Mg", rating: 2, stage: 3, date: "1ldsfaslkjf" },
    { avatar: "2", name: "Mg Mg", rating: 2, stage: 3, date: "2ldsfaslkjf" },
    { avatar: "3", name: "Mg Mg", rating: 2, stage: 3, date: "3ldsfaslkjf" },
    { avatar: "4", name: "Mg Mg", rating: 2, stage: 3, date: "4ldsfaslkjf" },
    { avatar: "5", name: "Mg Mg", rating: 2, stage: 3, date: "5ldsfaslkjf" },
    { avatar: "6", name: "Mg Mg", rating: 2, stage: 3, date: "6ldsfaslkjf" },
  ];

  return (
    <>
      <div className="candidate-top">
        <p className="candidate-count">
          Total Candidates <span>{data.length}</span>
        </p>
        <div>
          <button className="candidate-view">Pipeline View</button>
          <button className="candidate-view">Table View</button>
        </div>
      </div>
      {isTable ? <CandidateTable data={data} /> : <CandidateList data={data} />}
    </>
  );
};
