import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Input,Button,ButtonLink } from "../../components";

export const TopicUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [topic, setTopic] = useState("");
  //console.log(agency);

  const updateTopic = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/topics/${id}`,
        topic,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateTopic.mutate();
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
        <Input
          labelName="Name"
          type="text"
          name="name"
          value={topic.name}
          onChange={(e) => setTopic({ ...topic, name: e.target.value })}
          placeholder="Enter Name..."
          errorMessage="*"
        />
        <div className="button-group--user">
          <Button type="submit" text="Update" className="txt-light btn-primary" />
          <ButtonLink type="button" className="btn-default" route={"/topic"} text="Cancel" linkText="txt-light txt-sm" />
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