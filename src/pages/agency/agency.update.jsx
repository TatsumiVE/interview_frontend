import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";
import { toast } from "react-toastify";

export const AgencyUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState("");
  const [agency, setAgency] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addAgency = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/agencies/${id}`,
        agency,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/agency");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
      // console.log(error.response.data.data);
    }
  };

  const { mutate: updateAgency } = useMutation({
    mutationKey: ["put", "agencies"],
    mutationFn: addAgency,
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if (agency.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    updateAgency();
  };

  const getAgency = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/agencies/${id}`,
        config
      );
      const agencyData = response.data.data;

      if (agencyData) {
        setAgency(agencyData);
      }
      return agencyData;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: agencyData } = useQuery(["agencyData", id], getAgency);

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Agency</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            value={agency.name}
            onChange={(e) => setAgency({ ...agency, name: e.target.value })}
            placeholder=" Enter name..."
            errorMessage="*"
          />
          {error.name && (
            <span className="txt-danger txt-ss">{error.name}</span>
          )}
        </div>
        <div className="button-group--user">
          <Button
            type="submit"
            text="Update"
            className="txt-light btn-primary"
          />
          <ButtonLink
            type="button"
            className="btn-default cancel"
            route={"/agency"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
