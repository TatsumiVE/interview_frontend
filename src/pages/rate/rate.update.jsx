import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const RateUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [rate, setRate] = useState("");
  //console.log(agency);

  const updateRate = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/rates/${id}`,
        rate,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateRate.mutate();
  };

  const getRate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rates/${id}`,
        config
      );
      const rateData = response.data.data;
      if (rateData) {
        setRate(rateData);
      }
      return rateData;
    } catch (error) {
      //console.error(error);
    }
  };

  const { data: rateData } = useQuery(["rateData", id], getRate);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={rate.name}
          onChange={(e) => setRate({ ...rate, name: e.target.value })}
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