import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Input, ButtonLink, Button } from "../../components";

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

  const { mutate: createTopic } = useMutation({
    mutationKey: ["post", "topics"],
    mutationFn: addTopic,
  });

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Create Topic</h2>
      </div>
      <form className="card-min__form"
        onSubmit={(e) => {
          e.preventDefault();
          createTopic();
        }}
      >
        <Input
          labelName="Name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
          errorMessage="*"
        />
        <div className="button-group--user">
          <Button type="submit" text="Create" className="txt-light btn-primary" />
          <ButtonLink type="button" className="btn-default" route={"/topic"} text="Cancel" linkText="txt-light txt-sm" />
        </div>
      </form>
    </div>
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