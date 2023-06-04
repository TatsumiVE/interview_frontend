import { useOutletContext, useParams } from "react-router-dom";

export const CDetails = () => {
  const { id } = useParams();
  const { candidate } = useOutletContext();
  const experienceFilter = (experience) => {
    experience = experience || 0;
    let month = 0;
    let year = 0;
    month = experience % 12;
    year = Math.floor(experience / 12);
    return month || (month && year)
      ? [year ? ` ${year} year(s) ` : null, month ? `${month} month(s)` : null]
      : ["no experience"];
  };
  return (
    <div className="c-details">
      <div className="info-card">
        <div className="info-header">
          <h2>Basic Information</h2>
        </div>
        <div className="info-main">
          <div className="field">
            <p className="label">Name</p>
            <p>{candidate?.name}</p>
          </div>
          <div className="field">
            <p className="label">Email</p>
            <p>{candidate?.email}</p>
          </div>
          <div className="field">
            <p className="label">Date of Birth</p>
            <p>{candidate?.date_of_birth}</p>
          </div>
          <div className="field">
            <p className="label">Gender</p>
            <p>
              {candidate?.gender == 1
                ? "Male"
                : candidate?.gender == 2
                ? "Female"
                : "Non-Binary"}
            </p>
          </div>
          <div className="field">
            <p className="label">Phone</p>
            <p>{candidate?.phone_number}</p>
          </div>

          <div className="field">
            <p className="label">Joined from Agency Company</p>
            <p>{candidate?.agency.name || "-"}</p>
          </div>

          <div className="field">
            <p className="label">Address</p>
            <p>{candidate?.residential_address}</p>
          </div>
        </div>
      </div>
      <div className="info-card">
        <div className="info-header">
          <h2>Professional Details</h2>
        </div>
        <div className="info-main">
          <div className="field">
            <p className="label">Applied Job Position</p>
            <p>{candidate?.position.name}</p>
          </div>
          <div className="field">
            <p className="label">Earliest Starting Date</p>
            <p>{candidate?.earliest_starting_date || "-"}</p>
          </div>
          <div className="field">
            <p className="label">Expected Salary</p>
            <p>{candidate?.expected_salary || "-"}</p>
          </div>
          <div className="field">
            <p className="label">Last Earned Salary</p>
            <p>{candidate?.last_salary || "-"}</p>
          </div>
          <div className="field">
            <p className="label">Willingness To Travel</p>
            <p>{candidate?.willingness_to_travel || "-"}</p>
          </div>

          <div className="field">
            <p className="label">Experience in Years</p>{" "}
            {candidate?.specific_languages.map((lan) => {
              return (
                <>
                  <p>
                    {lan.devlanguage.name} {"=>"}{" "}
                    {experienceFilter(lan.experience)}{" "}
                  </p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
