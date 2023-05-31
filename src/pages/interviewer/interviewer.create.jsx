import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, ButtonLink, Dropdown, Input } from "../../components/utilites";
import { useAuth } from "../../store/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const InterviewerCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position_id, setPosition] = useState("");
  const [department_id, setDepartment] = useState("");
  const { token } = useAuth();
  const [error,setError] = useState("");
  const navigate= useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchPosition = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/positions",
      config
    );
    return response.data.data;
  };

  const {
    data: positions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get", "positions"],
    queryFn: fetchPosition,
  });

  const fetchDepartment = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/departments",
      config
    );

    return response.data.data;
  };

  const { data: departments } = useQuery({
    queryKey: ["get", "departments"],
    queryFn: fetchDepartment,
  });

  const addInterviewer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/interviewers",
        { name, email, department_id, position_id },
        config
      );
    
      let successMessage = response.data.message;

      toast.success(successMessage);
     
      setTimeout(() => {
        navigate('/interviewer');
      }, 1000);  

      return response;
    
    } catch (error) {
       setError(error.response.data.err_msg.errors);
    }
  };

  const { mutate: createInterviewer } = useMutation({
    mutationKey: ["post", "postions"],
    mutationFn: addInterviewer,
  });

  if (isLoading) return "Loading...";
  if (isError) return "error";

  return (
    <div className="card-min">
      <div className="card-min__header">
        <h2>Create Interviewer</h2>
      </div>
      <form className="card-min__form"
        onSubmit={(e) => {
          e.preventDefault();
          createInterviewer();
        }}
      >
        <Input
          labelName="Name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder=" Enter Name..."
          errorMessage="*"
        />
        {error.name && <span className="txt-danger txt-ss">{error.name}</span>}
        <Input
          labelName="Email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Enter Email..."
          errorMessage="*"
        />
        {error.email && <span className="txt-danger txt-ss">{error.email}</span>}

        <Dropdown
          labelName="Department"
          options={departments}
          selectedValue={department_id}
          onChange={(e) => setDepartment(e.target.value)}
          errorMessage="*"
        />
        {error.department_id && <span className="txt-danger txt-ss">{error.department_id}</span>}

        <Dropdown
          labelName="Position"
          options={positions}
          selectedValue={position_id}
          onChange={(e) => setPosition(e.target.value)}
          errorMessage="*"
        />
        {error.position_id && <span className="txt-danger txt-ss">{error.position_id}</span>}

        <div className="button-group--user">
          <Button type="submit" text="Create" className="txt-light btn-primary" />
          <ButtonLink type="button" className="btn-default" route={"/interviewer"} text="Cancel" linkText="txt-light txt-sm"/>
        </div>
      </form>
    </div>
  );
};








// import axios from "axios";
// import { useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { Button, ButtonLink, Dropdown, Input } from "../../components/utilites";
// import { useAuth } from "../../store/AuthContext";

// export const InterviewerCreate = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [position_id, setPosition] = useState("");
//   const [department_id, setDepartment] = useState("");
//   const { token } = useAuth();

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const fetchPosition = async () => {
//     const response = await axios.get(
//       "http://localhost:8000/api/positions",
//       config
//     );
//     return response.data.data;
//   };

//   const {
//     data: positions,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["get", "positions"],
//     queryFn: fetchPosition,
//   });

//   const fetchDepartment = async () => {
//     const response = await axios.get(
//       "http://localhost:8000/api/departments",
//       config
//     );

//     return response.data.data;
//   };

//   const { data: departments } = useQuery({
//     queryKey: ["get", "departments"],
//     queryFn: fetchDepartment,
//   });

//   const addInterviewer = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/interviewers",
//         { name, email, department_id, position_id },
//         config
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { mutate: createInterviewer } = useMutation({
//     mutationKey: ["post", "postions"],
//     mutationFn: addInterviewer,
//   });

//   if (isLoading) return "Loading...";
//   if (isError) return "error";

//   return (
//     <div className="card-min">
//       <div className="card-min__header">
//         <h2>Create Interviewer</h2>
//       </div>
//       <form className="card-min__form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           createInterviewer();
//         }}
//       >
//         <Input
//           labelName="Name"
//           type="text"
//           name="name"
//           onChange={(e) => setName(e.target.value)}
//           placeholder=" Enter Name..."
//           errorMessage="*"
//         />
//         <Input
//           labelName="Email"
//           type="email"
//           name="email"
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder=" Enter Email..."
//           errorMessage="*"
//         />

//         <Dropdown
//           labelName="Department"
//           options={departments}
//           selectedValue={department_id}
//           onChange={(e) => setDepartment(e.target.value)}
//           errorMessage="*"
//         />
//         <Dropdown
//           labelName="Position"
//           options={positions}
//           selectedValue={position_id}
//           onChange={(e) => setPosition(e.target.value)}
//           errorMessage="*"
//         />

//         <div className="button-group--user">
//           <Button type="submit" text="Create" className="txt-light btn-primary" />
//           <ButtonLink type="button" className="btn-default" route={"/user"} text="Cancel" linkText="txt-light txt-sm"/>
//         </div>
//       </form>
//     </div>
//   );
// };
