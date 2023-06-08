import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";
import { toast } from "react-toastify";

export const DevLanguageUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [devlanguage, setDevlanguage] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addDevlanguage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/dev-languages/${id}`,
        devlanguage,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/devlanguage");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
    }
  };

  const { mutate: updateDevlanguage } = useMutation({
    mutationKey: ["put", "departments"],
    mutationFn: addDevlanguage,
  });

  const getDevlanguage = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:8000/api/dev-languages/${id}`,
        config
      );
      const devlanguageData = response.data.data;
      if (devlanguageData) {
        setDevlanguage(devlanguageData);
      }
      return devlanguageData;
    } catch (error) {
      //console.error(error);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (devlanguage.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    updateDevlanguage();
  };

  const { data: devlanguageData } = useQuery(
    ["devlanguageData", id],
    getDevlanguage
  );

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Language</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            value={devlanguage.name}
            onChange={(e) =>
              setDevlanguage({ ...devlanguage, name: e.target.value })
            }
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
            className="btn-btnColor cancel"
            route={"/devlanguage"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
