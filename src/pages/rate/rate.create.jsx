import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Input,Button,ButtonLink } from "../../components";

export const RateCreate = () => {
  const [name, setName] = useState("");
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addRate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/rates",
        { name },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createRate } = useMutation({
    mutationKey: ["post", "rates"],
    mutationFn: addRate,
  });

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Create Rate</h2>
      </div>
      <form className="card-min__form"
        onSubmit={(e) => {
          e.preventDefault();
          createRate();
        }}
      >
        <Input
          labelName="Name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
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