import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";

export const PositionUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  };

  const [position, setPosition] = useState("");
  //console.log(agency);

  const updatePosition = useMutation(async () => {
    try {
      await axios.put(
        ` http://localhost:8000/api/positions/${id}`,
        position,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updatePosition.mutate();
  };

  const getPosition = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:8000/api/positions/${id}`,
        config
      );
      const positionData = response.data.data;
      if (positionData) {
        setPosition(positionData);
      }
      return positionData;
    } catch (error) {
      //console.error(error);
    }
  };

  const { data: positionData } = useQuery(["positionData", id], getPosition);

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Position</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <Input
          labelName="Name"
          type="text"
          name="name"
          value={position.name}
          onChange={(e) => setPosition({ ...position, name: e.target.value })}
          placeholder="Enter Name..."
          errorMessage="*"
        />
        {/* {error.position && (
          <span className="txt-danger txt-ss">{error.position}</span>
        )} */}

        <div className="button-group--user">
          <Button
            type="submit"
            text="Update"
            className="txt-light btn-primary"
          />
          <ButtonLink
            type="button"
            className="btn-default"
            route={"/position"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
