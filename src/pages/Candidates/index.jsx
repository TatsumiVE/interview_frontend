import styles from "./style.module.scss";
import { useState } from "react";
import CandidateTable from "../../components/candidate/CandidateTable";
import CandidateList from "../../components/candidate/CandidateList";

const Candidate = () => {
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
      <div className={styles["candidate-top"]}>
        <p className={styles["candidate-count"]}>
          Total Candidates <span>{data.length}</span>
        </p>
        <div>
          <button className={styles["candidate-view"]}>Pipeline View</button>
          <button className={styles["candidate-view"]}>Table View</button>
        </div>
      </div>
      {isTable ? <CandidateTable data={data} /> : <CandidateList data={data} />}
    </>
  );
};

export default Candidate;
