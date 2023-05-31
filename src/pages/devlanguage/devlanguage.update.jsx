import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const DevLanguageUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [devlanguage, setDevlanguage] = useState("");
  //console.log(agency);

  const updateDevlanguage = useMutation(async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/dev-languages/${id}`,
        devlanguage,
        config
      );
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateDevlanguage.mutate();
  };

  const getDevlanguage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/dev-languages/${id}`,
        config
      );
      const devlanguageData = response.data.data;
      if (devlanguageData) {
        setDevlanguage(devlanguageData);
      }
      return devlanguageData;
    } catch (error) {
      //console.error(error);
    }
  };

  const { data: devlanguageData } = useQuery(["devlanguageData", id], getDevlanguage);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={devlanguage.name}
          onChange={(e) => setDevlanguage({ ...devlanguage, name: e.target.value })}
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





// export const DepapartmentUpdate = () => {
//   return(
//     <>
//     </>
//   )
// }




// export const DevLanguageUpdate = () => {
//   return(
//     <>
//     Hello
//     </>
//   )
// }