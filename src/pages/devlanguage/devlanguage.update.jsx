import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";

export const DevLanguageUpdate = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [devlanguage, setDevlanguage] = useState("");

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
        ` http://localhost:8000/api/dev-languages/${id}`,
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

  const { data: devlanguageData } = useQuery(
    ["devlanguageData", id],
    getDevlanguage
  );

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Update Language</h2>
      </div>
      <form onSubmit={handleUpdate}>
        <Input
          labelName="Name"
          type="text"
          name="name"
          value={devlanguage.name}
          onChange={(e) =>
            setDevlanguage({ ...devlanguage, name: e.target.value })
          }
          placeholder="Enter Name..."
          errorMessage="*"
        />
        <div className="button-group--user">
          <Button
            type="submit"
            text="Update"
            className="txt-light btn-primary"
          />
          <ButtonLink
            type="button"
            className="btn-default"
            route={"/devlanguage"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};




// export const DevLanguageUpdate = () => {
//   return(
//     <>
//     Hello
//     </>
//   )
// }