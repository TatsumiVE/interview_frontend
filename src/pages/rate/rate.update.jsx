import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, ButtonLink } from "../../components";
import { toast } from "react-toastify";

export const RateUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [rate, setRate] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addRate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/rates/${id}`,
        rate,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/rate");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
    }
  };

  const { mutate: updateRate } = useMutation({
    mutationKey: ["put", "rates"],
    mutationFn: addRate,
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if (rate.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    updateRate();
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
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            value={rate.name}
            onChange={(e) => setRate({ ...rate, name: e.target.value })}
            placeholder="Enter Name..."
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
            route={"/rate"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
