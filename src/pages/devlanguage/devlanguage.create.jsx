import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";

export const DevlanguageCreate = () => {
  const [name, setName] = useState("");
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createDevlanguage} = useMutation({
    mutationKey: ["post", "dev-languages"],
    mutationFn: addDevlanguage,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createDevlanguage();
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

// export const DevLanguageCreate = () => {
//   return (
//     <>
//     Hello
//     </>
//   )
// }