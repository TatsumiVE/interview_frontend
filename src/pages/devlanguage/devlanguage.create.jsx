import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Button, ButtonLink, Input } from "../../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DevLanguageCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState([]);
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addDevlanguage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/dev-languages",
        { name },
        config
      );

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/devlanguage");
      }, 1000);
    } catch (error) {
      setError(error.response.data.err_msg.errors);
    }
  };

  const { mutate: createDevlanguage } = useMutation({
    mutationKey: ["post", "dev-languages"],
    mutationFn: addDevlanguage,
  });

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Create Language</h2>
      </div>
      <form
        className="card-min__form"
        onSubmit={(e) => {
          e.preventDefault();
          createDevlanguage();
        }}
      >
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name..."
            errorMessage="*"
          />
          {error && <span className="txt-danger txt-ss">{error.name}</span>}
        </div>
        <div className="button-group--user">
          <Button
            type="submit"
            text="Create"
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
