import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Input,Button,ButtonLink } from "../../components";

export const RateUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [rate, setRate] = useState("");
  

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
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Rate</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <Input
          labelName="Name"
          type="text"
          name="name"
          value={rate.name}
          onChange={(e) => setRate({ ...rate, name: e.target.value })}
          placeholder="Enter Name..."
          errorMessage="*"
        />
        <div className="button-group--user">
          <Button type="submit" text="Create" className="txt-light btn-primary" />
          <ButtonLink type="button" className="btn-default" route={"/rate"} text="Cancel" linkText="txt-light txt-sm" />
        </div>
      </form>
    </div>
  );
};


// export const PositionUpdate = () => {
//   return(
//     <>
//     Hello
//     </>
//   )
// }