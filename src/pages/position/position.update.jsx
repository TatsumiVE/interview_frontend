import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";
import { toast } from "react-toastify";

export const PositionUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");  
  const [position, setPosition] = useState([]);

  const config = {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  };


  const addPosition = async () => {
    try {
        const response = await axios.put(
            `http://localhost:8000/api/positions/${id}`,
            position,
            config
        );

        console.log(response.data.message);

        let successMessage = response.data.message;

        toast.success(successMessage);

        setTimeout(() => {
            navigate('/position');
        }, 1000);

    } catch (error) {
        if (error.response && error.response.data && error.response.data.data) {
            setError(error.response.data.data);
        } else {
            setError([]);
        }
       
    }
};

const { mutate: updatePosition} = useMutation({
    mutationKey: ["put", "positions"],
    mutationFn: addPosition,
});


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

  
  const handleUpdate = (event) => {
    event.preventDefault();
    if (position.name == "") {
        const response = setError({ name: "The name field is required." });
        return response;
    }
    updatePosition();
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
        {error.name && (
          <span className="txt-danger txt-ss">{error.name}</span>
        )}

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
