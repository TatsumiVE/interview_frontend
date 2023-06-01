import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";

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

  const { mutate: createRate} = useMutation({
    mutationKey: ["post", "rates"],
    mutationFn: addRate,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRate();
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