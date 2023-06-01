import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";

export const PositionCreate = () => {
  const [name, setName] = useState("");
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addPosition = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/positions",
        { name },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createPosition} = useMutation({
    mutationKey: ["post", "positions"],
    mutationFn: addPosition,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPosition();
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