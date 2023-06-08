import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuth } from "../../store/AuthContext";
import candidateService from "../../services/candidateService";
import Loader from "../../components/loader";
import profileImage from "../../assets/image/profile-picture.ico";

export const CandidateDetails = () => {
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

  useEffect(() => {
    console.log(candidateData);
    candidateData && setData(candidateData);
  }, [candidateData]);

  const activeClassName = ({ isActive }) => (isActive ? "active" : "");

  if (isLoading) return <Loader />;
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  if (isSuccess && data?.candidate)
    return (
      <div className="candidate-page">
        <div className="c-header">
          <img className="c-avatar" src={profileImage} />
          <div>
            <p>{data.candidate?.name}</p>
            <p className="c-role">Junior web developer</p>
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
        </div>
        <div className="c-main">
          <Outlet context={data} />
        </div>
      </div>
    );
};
