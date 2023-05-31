import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const PositionUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [position, setPosition] = useState("");
  //console.log(agency);

  const updatePosition = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/positions/${id}`,
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
        `http://localhost:8000/api/positions/${id}`,
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
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={position.name}
          onChange={(e) => setPosition({ ...position, name: e.target.value })}
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


// export const PositionUpdate = () => {
//   return(
//     <>
//     Hello
//     </>
//   )
// }