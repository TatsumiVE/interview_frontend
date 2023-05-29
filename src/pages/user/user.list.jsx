import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../store/AuthContext';


export const UserList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const usersResponse = await axios.get('http://localhost:8000/api/users');
      //   const usersData = usersResponse.data.data;

      //   const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers');
      //   const interviewers = interviewerResponse.data.data;

      //   const filteredUsers = usersData.filter(user => user.interviewer === id);
      //   const usersWithInterviewers = filteredUsers.map(user => {
      //     const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);
      //     return {
      //       ...user,
      //       interviewer: interviewer || {},
      //     };
      //   });

      //   setUsers(usersWithInterviewers);
      // } catch (error) {
      //   console.error(error);
      // }

      try {
            const usersResponse = await axios.get('http://localhost:8000/api/users',config);
            const users = usersResponse.data.data;
        
            const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers',config);
            const interviewers = interviewerResponse.data.data;
        
            const filteredUsers = users.filter(user => user.interviewer === id);
            const usersWithInterviewers = filteredUsers.map(user => {
              const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);
              //console.log('User:', user);
              //console.log('Interviewer:', interviewer);
              return {
                ...user,
                interviewer: interviewer || {}, // Provide an empty object if interviewer is not found
              };
            });
            setUsers(usersWithInterviewers);
            //console.log('Users with Interviewers:', usersWithInterviewers);
           // return usersWithInterviewers;
          } catch (error) {
            console.error(error);
          }
    };

    fetchData();
  }, [id]);

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'interviewer_id.name' },
      { Header: 'Email', accessor: 'interviewer_id.email' },
      { Header: 'Role', accessor: 'role[0].name' },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button type="button">
              <Link to={`update/${row.original.id}`}>Update User</Link>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    pageOptions,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data:users,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
          {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};





// import { useQuery } from 'react-query';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';


// export const UserList = () => {
//   const { id } = useParams();
  
// const getUsers = async () => {
//   try {
//     const usersResponse = await axios.get('http://localhost:8000/api/users');
//     const users = usersResponse.data.data;

//     const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers');
//     const interviewers = interviewerResponse.data.data;

//     const filteredUsers = users.filter(user => user.interviewer === id);
//     const usersWithInterviewers = filteredUsers.map(user => {
//       const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);
//       //console.log('User:', user);
//       //console.log('Interviewer:', interviewer);
//       return {
//         ...user,
//         interviewer: interviewer || {}, // Provide an empty object if interviewer is not found
//       };
//     });

//     console.log('Users with Interviewers:', usersWithInterviewers);
//     return usersWithInterviewers;
//   } catch (error) {
//     console.error(error);
//   }
// };

//   const { data: users, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery(
//     'users',
//     getUsers
//   );

//   if (isUsersLoading) return 'Loading...';
//   if (isUsersError) return 'Something went wrong...';
//   if (usersError) return `An error has occurred: ${usersError.message}`;

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.interviewer_id.name}</td>
//               <td>{user.interviewer_id.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };






// import { useQuery, useMutation } from 'react-query';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useState } from 'react';

// export const UserList = () => {
//   const { id } = useParams();
//   const [interviewer, setInterviewer] = useState({
//     interviewer_id: id,
//     password: '',
//     role: '',
//   });

//  const getUsers = async () => {
//     try {
//       const usersResponse = await axios.get(`http://localhost:8000/api/users`);
//       const users = usersResponse.data.data;

//       const interviewerResponse = await axios.get(`http://localhost:8000/api/interviewers`);
//       const interviewers = interviewerResponse.data.data;

//       const filteredUsers = users.filter(user => user.interviewer_id === id);
//       return filteredUsers;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { data: users, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery(
//     'users',
//     getUsers
//   );

//   if (isUsersLoading) return 'Loading...';
//   if (isUsersError) return 'Something went wrong...';
//   if (usersError) return `An error has occurred: ${usersError.message}`;

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.interviewers.name}</td>
//               <td>{user.interviewers.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };
