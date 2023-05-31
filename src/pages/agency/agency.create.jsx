import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";

export const AgencyCreate = () => {
  const [name, setName] = useState("");
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const addAgency = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/agencies",
        { name },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: createAgency } = useMutation({
    mutationKey: ["post", "agencies"],
    mutationFn: addAgency,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createAgency();
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
