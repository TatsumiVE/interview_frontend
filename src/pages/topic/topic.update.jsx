import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

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
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={topic.name}
          onChange={(e) => setTopic({ ...topic, name: e.target.value })}
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