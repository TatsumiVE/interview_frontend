import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, ButtonLink } from "../../components";
import { toast } from "react-toastify";

export const TopicUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [topic, setTopic] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addTopic = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/topics/${id}`,
        topic,
        config
      );

      console.log(response.data.message);

      let successMessage = response.data.message;

      toast.success(successMessage);

      setTimeout(() => {
        navigate("/topic");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data);
      } else {
        setError([]);
      }
    }
  };

  const { mutate: updateTopic } = useMutation({
    mutationKey: ["put", "rates"],
    mutationFn: addTopic,
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    if (topic.name == "") {
      const response = setError({ name: "The name field is required." });
      return response;
    }
    updateTopic();
  };
  const getTopic = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/topics/${id}`,
        config
      );
      const topicData = response.data.data;
      if (topicData) {
        setTopic(topicData);
      }
      return topicData;
    } catch (error) {
      //console.error(error);
    }
  };

  const { data: topicData } = useQuery(["topicData", id], getTopic);

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Topic</h2>
      </div>
      <form onSubmit={handleUpdate} className="card-min__form">
        <div className="input-group">
          <Input
            labelName="Name"
            type="text"
            name="name"
            value={topic.name}
            onChange={(e) => setTopic({ ...topic, name: e.target.value })}
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
            route={"/topic"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
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
