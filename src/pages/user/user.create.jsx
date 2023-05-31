
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { Button, Input, Dropdown, ButtonLink } from "../../components";

export const UserCreate = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState([]);
  const [errorResult,setErrorResult] = useState("");
  const [interviewer, setInterviewer] = useState({
    interviewer_id: id,
    password: '',
    role: '',
  });



  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getInterviewer = async () => {
    try {


      const response = await axios.get(
        `http://localhost:8000/api/interviewers/${id}`,
        config
      );

      return response.data.data;



    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/roles",config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: interviewers,
    isLoading: isInterviewerLoading,
    isError: isInterviewerError,
    isSuccess: isInterviewerSuccess,
    error: interviewerError,
  } = useQuery(["interviewers", id], getInterviewer);

  const { data: roles, isLoading: isRolesLoading, isError: isRolesError, isSuccess: isRolesSuccess, error: rolesError } = useQuery(
    'roles',
    getRoles
  );

  const addUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        interviewer,
        config
      );   

      return response;
    } catch (error) {
     
      setError(error.response.data.err_msg.errors);    
     
    }
  };




  const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      document.body.removeChild(alertBox);

    }, 5000);
  };


  const { mutate: createUser } = useMutation({
    mutationKey: ["post", "users"],
    mutationFn: addUser,
  });

  if (isInterviewerLoading || isRolesLoading) return "Loading...";
  if (isInterviewerError) return "Something went wrong...";
  if (interviewerError)
    return `An error has occurred: ${interviewerError.message}`;
  if (isRolesError) return "Something went wrong...";
  if (rolesError) return `An error has occurred: ${rolesError.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("here submit");
    // Check if the required fields are provided
    if (!interviewer.interviewer_id || !interviewer.password || !interviewer.role) {
      console.error("Required fields are missing"); // Log an error message if required fields are missing
      return;
    }
    
    createUser();
  };

  return (
    <div className='card-min'>
      <div className="card-min__header">
        <h2>Create User Role</h2>
      </div>  
     
      <form onSubmit={handleSubmit} className="card-min__form">
        <div>
          <Input
            labelName="Name"
            type="text"
            name="name"
            placeholder=" Enter Name..."
            value={interviewers.name}
          />
          <Input
            labelName="Email"
            type="email"
            name="email"
            placeholder=" Enter Email..."
            value={interviewers.email}
          />

          <Input
            labelName="Password"
            type="password"
            name="password"
            placeholder=" Enter Password..."
            onChange={(e) => setInterviewer({ ...interviewer, password: e.target.value })}
            errorMessage="*"
          />
          {error.password && <span className="txt-danger txt-ss">{error.password}</span>}

          <Input
            labelName="Confirm Password"
            type="password"
            name="password_confirmation"
            placeholder=" Enter Confirm Password..."
            onChange={(e) => setInterviewer({ ...interviewer, password_confirmation: e.target.value })}
            errorMessage="*"
          />
          {error.password && <span className="txt-danger txt-ss">{error.password}</span>}

          <Dropdown
            labelName="Role"
            options={roles}
            selectedValue={roles.id}
            onChange={(e) => setInterviewer({ ...interviewer, role: e.target.value })}
            errorMessage="*"
          />
          {error.role && <span className="txt-danger txt-ss">{error.role}</span>}

          <div className="button-group--user">
            <Button type="submit" text="Create" className="txt-light btn-primary" />
            <ButtonLink type="button" className="btn-default" route={"/interviewer"} text="Cancel" linkText="txt-light txt-sm" />
          </div>
        </div>
      </form>
    </div>
  );
};

// import { useQuery, useMutation } from 'react-query';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// export const UserCreate = () => {
//   const { id } = useParams(); 
//   const [interviewer, setInterviewer] = useState({
//     interviewer_id:id,
//     password:'',
//     role:'',
//   });

//   const getInterviewer = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/interviewers/${id}`);
     
//       return response.data.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getRoles = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/roles");
     
//       return response.data.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { data: interviewers, isLoading: isInterviewerLoading, isError: isInterviewerError, isSuccess: isInterviewerSuccess, error: interviewerError } = useQuery(
//     ['interviewers', id],
//     getInterviewer
//   );

//   const { data: roles, isLoading: isRolesLoading, isError: isRolesError, isSuccess: isRolesSuccess, error: rolesError } = useQuery(
//     'roles',
//     getRoles
//   );
 

//   const addUser = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/users", 
//        interviewer        
//       );
//       return response;
//     } catch (error) {
//       //console.error(error);
//     }
//   };

//   const { mutate: createUser } = useMutation(
//     {
//       mutationKey:["post","users"],
//       mutationFn: addUser,
//     }
//   );

//   if (isInterviewerLoading || isRolesLoading) return 'Loading...';
//   if (isInterviewerError) return 'Something went wrong...';
//   if (interviewerError) return `An error has occurred: ${interviewerError.message}`;
//   if (isRolesError) return 'Something went wrong...';
//   if (rolesError) return `An error has occurred: ${rolesError.message}`;

//   const handleSubmit= (e) => {
//     e.preventDefault();
//     createUser();
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={interviewers.name}
           
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={interviewers.email}
           
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder=" Enter Password"            
//             onChange={(e) => setInterviewer({ ...interviewer, password: e.target.value })}
//           />
//           <input
//             type="password"
//             name="password_confirmation"
//             placeholder=" Enter Confirm Password"           
//             onChange={(e) => e.target.value }
//           />
//           <select name="role"  onChange={(e) =>setInterviewer({...interviewer,role:e.target.value})}>
//             <option value="">Select Role</option>
//             {roles.map((role) => (
               
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </select>
//           <button type="submit">Create Role</button>
//         </div>
//       </form>
//     </>
//   );
// };
