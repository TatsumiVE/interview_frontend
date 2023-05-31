import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const AgencyUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [agency, setAgency] = useState("");
  //console.log(agency);

  const updateAgency = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/agencies/${id}`,
        agency,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateAgency.mutate();
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
      //console.error(error);
    }
  };

  const { data: agencyData } = useQuery(["agencyData", id], getAgency);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={agency.name}
          onChange={(e) => setAgency({ ...agency, name: e.target.value })}
          placeholder="Enter name"
        />
        <div>
          <button type="submit">Update</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </>
  );
};
