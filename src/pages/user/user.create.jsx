
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export const UserCreate = () => {
  const { id } = useParams();
  
  const getInterviewer = async () => {
    const response = await axios.get(`http://localhost:8000/api/interviewers/${id}`);
    console.log(response.data.data);
    return response.data.data;
  }

  const { data: data, isLoading, isError, isSuccess, error } = useQuery(
    ['get', 'interviewers', id], getInterviewer
  );

  if(isLoading) return "Loading...";
  if(isError) return "Something went wrong...";
  if(error) return "An error has occurred:"+error.message;
  const interviewer = data[0];

  const handleUpdate = () => {

  }
  return (
    <></>
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Name"
    //     value={interviewer.name}
    //     // onChange={(e) => setName(e.target.value)}
    //   />
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={interviewer.email}
    //     // onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value=""
    //     // onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Confirm Password"
    //     value=""
    //     // onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <select name="role">
    //     <option value="role1">1</option>
    //     <option value="role1">2</option>
    //     <option value="role1">3</option>
    //   </select>
    //   <button onClick={handleUpdate}>Create User</button>
    // </div>
  );
};