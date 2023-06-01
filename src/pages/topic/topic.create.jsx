import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";

export const TopicCreate = () => {
  const [name, setName] = useState("");
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addTopic = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/topics",
        { name },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createTopic} = useMutation({
    mutationKey: ["post", "topics"],
    mutationFn: addTopic,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTopic();
        }}
      >
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <div>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </>
  );
};




// export const DepartmentCreate = () => {
//   return (
//     <>
//      Hello
//     </>
//   )
// }









// export const PositionCreate = () => {
//   return (
//     <>
//     Hello
//     </>
//   )
// }