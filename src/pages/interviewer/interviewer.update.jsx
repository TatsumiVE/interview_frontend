// import React, { useState, useEffect } from 'react';
// import { Button, Dropdown, Input } from '../../components';
// import { useMutation, useQuery } from 'react-query';
// import axios from 'axios';

// const InterviewerUpdate = ({ interviewerId }) => {
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:8000/api/positions');
//     return response.data.data;
//   };

//   const fetchInterviewer = async () => {
//     const response = await axios.get(`http://localhost:8000/api/interviewers/${interviewerId}`);
//     const { name, position } = response.data;
//     setName(name);
//     setPosition(position);
//   };

//   useEffect(() => {
//     fetchInterviewer();
//   }, [interviewerId]);

//   const updateInterviewer = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/interviewers/${interviewerId}`, {
//         name: name,
//         position: position,
//       });
//       console.log('Update successful:', response.data);
//       // Perform any necessary actions after a successful update
//     } catch (error) {
//       console.error('Update failed:', error);
//       // Handle error scenarios
//     }
//   };

//   const { data: positions, isLoading, isError } = useQuery({
//     queryKey: ['get', 'positions'],
//     queryFn: fetchData,
//   });

//   return (
//     <>
//       <div className="card">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             updateInterviewer();
//           }}
//         >
//           <div className="card-wrap">
//             <div className="card-input__group">
//               <Input
//                 labelName="Name"
//                 type="text"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter Name"
//               />
//             </div>
//             <div className="card-input__group">
//               <Dropdown
//                 labelName="Position"
//                 options={positions}
//                 selectedValue={position}
//                 onChange={(e) => setPosition(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="btn-group">
//             <Button type="submit" text="Update" className="txt-light btn-primary" />
//             <Button type="button" text="Cancel" className="txt-light btn-default" onClick={() => console.log('Cancelled')} />
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InterviewerUpdate;


 import React from 'react'
import { Button, Dropdown, Input } from '../../components';
import {useQuery } from 'react-query';
import axios from 'axios';

const InterviewerUpdate=()=>{
    const fetchData = async () => {
        const response = await axios.get("http://localhost:8000/api/positions");
    
        console.log(response.data.data);
        return response.data.data;
      };
    
      const {
        data: positions,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["get", "positions"],
        queryFn: fetchData,
      });
 
      
  return (
    <>
    <div className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateInterviewer();
        }}
      >
        <div className="card-wrap">
          <div className="card-input__group">
            <Input
              labelName="Name"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            ></Input>
          </div>
          <div className="card-input__group">
            <Dropdown
              labelName="Position"
              options={positions}
              selectedValue=""
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-group">
          <Button type="submit" text="Update" className="txt-light btn-primary"/>
          <Button type="submit" text="Cancel" className="txt-light btn-default"/>
        </div>
      </form>
    </div>    
    </>
  )
}
export default InterviewerUpdate;
