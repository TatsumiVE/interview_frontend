import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const UserUpdate = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    interviewer_id:"",
    role: "",
  });

  const updateUser = useMutation(async () => {
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, user);
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    updateUser.mutate();
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${id}`);
      setUser(response.data.data);
      console.log(user.interviewer_id.id);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getRole = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/roles");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: users, isLoading: isUserLoading, isError: isUserError, isSuccess: isUserSuccess, error: userError } = useQuery(
    ['users'],
    getUser
  );

  const { data: roles, isLoading: isRoleLoading, isError: isRoleError, isSuccess: isRoleSuccess, error: roleError } = useQuery(
    ['roles'],
    getRole
  );

  if (isUserLoading || isRoleLoading) return 'Loading...';
  if (isUserError || isRoleError) return 'Something went wrong...';
  if (userError || roleError) return 'An error has occurred.';
   
  const handleRoleChange = (event) => {
   
   
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.interviewer_id.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.interviewer_id.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <select name="role" value={user.role} onChange={handleRoleChange} >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id} selected={role.id==user.role[0].id}>
                {role.name}
              </option>
            ))}
          </select>

          <div>
            <button type="submit">Update</button>
            <button type="button">Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};








//truely
// import React, { useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import axios from 'axios';

// export const UserUpdate = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role_id: "",
//   });
//   console.log(user);

//   const updateUser = useMutation(async () => {
//     try {
//       await axios.put(`http://localhost:8000/api/users/${id}`, user);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   const handleUpdate = (event) => {
//     event.preventDefault();
//     updateUser.mutate();
//   };

//   const getUsers = async () => {
//     // try {
//     //   const usersResponse = await axios.get(`http://localhost:8000/api/users/${id}`);
//     //   const users = usersResponse.data;

//     //   const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers');
//     //   const interviewers = interviewerResponse.data.data;

//     //   const filteredUsers = users.filter(user => user.interviewer === id);
//     //   const usersWithInterviewers = filteredUsers.map(user => {
//     //     const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);
//     //     return {
//     //       ...user,
//     //       interviewer: interviewer || {},
//     //     };
//     //   });
//     //   setUser(usersWithInterviewers); 
//     //   return usersWithInterviewers;  // Assuming there is only one user
//     // } catch (error) {
//     //   console.error(error);
//     // }
//     try{
//       const response = await axios.get(`http://localhost:8000/api/users/${id}`);
//       setUser(response.data.data);
//       return response.data.data;
//     }catch(error){

//     }
//   };

//   const getRole = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/roles");
//       console.log(response);
//       return response.data.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery(
//     ['users', id],
//     getUsers
//   );

//   const { data: roles, isLoading: isRoleLoading, isError: isRoleError, error: roleError } = useQuery(
//     ['roles'],
//     getRole
//   );
//   //console.log(roles);
  

//   if (isUserLoading) return 'Loading...';
//   if (isUserError) return 'Something went wrong...';
//   if (userError) return `An error has occurred: ${userError.message}`;

//   return (
//     <>
//       <form onSubmit={handleUpdate}>
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter name"
//             value={user.interviewer_id.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={user.interviewer_id.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />

//           <select
//             name="role"
//             value={user.role_id}
//             onChange={(e) => setUser({ ...user, role_id: e.target.value })}
//           >
//             <option value="">Select Role</option>
//             {roles && roles.map((role) => (
//               <option
//                 key={role.id}
//                 value={role.id}
//                 selected={role.id === user.role_id}
//               >
//                 {role.name}
//               </option>
//             ))}
//           </select>
//           <div>
//             <button type="submit">Update</button>
//             <button type="button">Cancel</button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };









// import React,{ useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { useParams } from "react-router-dom"
// import axios from 'axios';


// export const UserUpdate = () => {
//   const {id} = useParams();
//   const [user,setUser] = useState({
//     name:"",
//     email:"",
//     role:"",
//   });

//   const updateUser = useMutation(async ()=>{
//     try{
//        axios.put(`http://localhost:8000/api/users/${id}`,user);
      
//     }catch(error){
//     console.error(error)}
// })

//   const getUsers = async () => {
//       try {
//         const usersResponse = await axios.get(`http://localhost:8000/api/users/${id}`);
//         const users = usersResponse.data.data;
    
//         const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers');
//         const interviewers = interviewerResponse.data.data;
    
//         const filteredUsers = users.filter(user => user.interviewer === id);
//         const usersWithInterviewers = filteredUsers.map(user => {
//           const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);
//           //console.log('User:', user);
//           //console.log('Interviewer:', interviewer);
//           return {
//             ...user,
//             interviewer: interviewer || {}, // Provide an empty object if interviewer is not found
//           };
//         });
    
//         //console.log('Users with Interviewers:', usersWithInterviewers);
//         return usersWithInterviewers;
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const getRole = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/roles");
//         return response.data.data;
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     const { data: users, isLoading: isuserLoading, isError: isuserError, isSuccess: isuserSuccess, error: userError } = useQuery(
//       ['users', id],
//       getUsers
//     );

//     const { data: roles, isLoading: isroleLoading, isError: isroleError, isSuccess: isroleSuccess, error: roleError } = useQuery(
//       ['roles'],
//       getRole
//     );

//     const handleUpdate=(event)=>{
//       event.preventDefault();
//       updateUser.mutate()    
//     }

//     if (isuserLoading) return 'Loading...';
//     if (isuserError) return 'Something went wrong...';
//     if (userError) return `An error has occurred: ${userError.message}`;


//   return(
//     <>

//     <form onSubmit={handleUpdate}>
//       <div>
//         <input 
//         type="text"
//         name="name"
//         placeholder="Enter name"
//         value={user.interviewer_id.name}
//         onChange={(e)=>setUser({...user,name:e.target.value})}
//         />

//       <input 
//         type="email"
//         name="email"
//         placeholder="Enter email"
//         value={user.interviewer_id.email}
//         onChange={(e)=>setUser({...user,eamil:e.target.value})}
//         />

//       <select name="role" value={user.role_id} 
//           onChange={(e)=>setUser({...user,role_id:e.target.value})}>           
//             <option value="">Select Role</option>
//             {
//               roles.map((role) => (
//                 <option key={role.id} value={role.id} selected={role.id === user.role_id}>
//                   {role.name}
//                 </option>
//               ))
//             }
//           </select>
//           <div>
//             <button type="submit">Update</button>
//             <button type="button">Cancel</button>
//           </div>
//       </div>
//     </form>
//     </>
//   )
// }








// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery, useMutation } from 'react-query';

// export const UserUpdate = () => {
//   const { id } = useParams();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');

//   const { data: user, isLoading, isError } = useQuery(['user', id], async () => {
//     const response = await fetch(`http://localhost:8000/api/users/${id}`);
//     const userData = await response.json();
//     return userData.data;
//   });

//   const updateUserMutation = useMutation(async () => {
//     const response = await fetch(`http://localhost:8000/api/users/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, role }),
//     });
//     const updatedUserData = await response.json();
//     return updatedUserData.data;
//   });

//   const handleSubmit = e => {
//     e.preventDefault();
//     updateUserMutation.mutate();
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error occurred while fetching user data.</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
      
//         <input type="text" value={name} onChange={e => setName(e.target.value)} />
      
//       <br />
     
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      
//       <br />
      
//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="">Select Role</option>
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//         </select>
      
//       <br />
//       <button type="submit" disabled={updateUserMutation.isLoading}>
//         {updateUserMutation.isLoading ? 'Updating...' : 'Update'}
//       </button>
//     </form>
//   );
// };
