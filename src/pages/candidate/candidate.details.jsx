import { Link, useOutletContext, useParams } from "react-router-dom";

export const CDetails = () => {
  const {id}=useParams();
  const { candidate } = useOutletContext();
  console.log(candidate);
  console.log(id);
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
      <div className="info-card">
        <div className="info-header">
          <h2>Professional Details</h2>

         
        </div>
        <div className="info-main">
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
