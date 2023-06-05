import { useOutletContext } from "react-router-dom";
export const CCv = () => {
  const { candidate } = useOutletContext();
  return (
    <>
      {console.log(candidate)}
      <div className="c-cv">
        <iframe src={candidate.cv_path}></iframe>
      </div>
    </>
  );
};
