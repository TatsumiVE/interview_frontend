import React, { useMemo,useState, useEffect  } from 'react';
import { useTable, useGlobalFilter, usePagination} from 'react-table';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Candidate = () => {
  const [candidateData, setCandidateData] = useState([]);

  const getCandidates = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/candidates');
    return response.data.data;
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await getCandidates();
      setCandidateData(data);
    };

    fetchCandidates();
  }, []);

  const showInfo = () => {};

  // const {
  //   data:candidates,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['get', 'candidates'],
  //   queryFn: getCandidates,
  // });

  // if (isLoading) return 'Loading...';
  // if (isError) return 'Something went wrong';
  // if (error) return 'An error has occurred: ' + error.message;

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Gender', accessor: 'gender' },
      { Header: 'Phone Number', accessor: 'phone_number' },
      { Header: 'Applied Position', accessor: 'position.name' },
      {
        Header: 'Language',
        accessor: (row) =>
          row.specific_languages
            .map((language) => language.devlanguage.name)
            .join(', '),
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <Link to={`/candidates/${row.original.id}`}>View Details</Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data: candidateData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
    
  );

  const { globalFilter, pageIndex } = state;
  if (candidateData.length === 0) return 'Loading...';

  return (
    <div>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
      <table {...getTableProps()} className="candidate-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={showInfo}>
                {row.cells.map((cell) => (
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
    </div>
  );
};


// import React from 'react';
// import { useTable } from 'react-table';
// import axios from "axios";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";
// export const Candidate = () => {
//   const getCandidates = async () => {
//     const response = await axios.get("http://127.0.0.1:8000/api/candidates");
//     return response.data.data;
//   };

//   const showInfo = () => {};

//   const {
//     data: candidates,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["get", "candidates"],
//     queryFn: getCandidates,
//   });

//   if (isLoading) return "Loading...";
//   if (isError) return "Something went wrong";
//   if (error) return "An error has occurred: " + error.message;

//   const columns = React.useMemo(
//     () => [
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Email', accessor: 'email' },
//       { Header: 'Gender', accessor: 'gender' },
//       { Header: 'Phone Number', accessor: 'phone_number' },
//       { Header: 'Applied Position', accessor: 'position.name' },
//       {
//         Header: 'Language',
//         accessor: (row) =>
//           row.specific_languages
//             .map((language) => language.devlanguage.name)
//             .join(', '),
//       },
//       {
//         Header: 'Action',
//         Cell: ({ row }) => (
//           <Link to={`/candidates/${row.original.id}`}>View Details</Link>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data: candidates });

//   return (
//     <div>
//       <table {...getTableProps()} className="candidate-table">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} onClick={showInfo}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// import axios from "axios";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";
// export const Candidate = () => {
//   const getCandidates = async () => {
//     const response = await axios.get("http://127.0.0.1:8000/api/candidates");
//     console.log(response.data.data);
//     return response.data.data;
//   };
//   const showInfo = () => {};
//   const {
//     data: candidates,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["get", "candidates"],
//     queryFn: getCandidates,
//   });
//   if (isLoading) return "Loading...";
//   if (isError) return "something went wrong";
//   if (error) return "An error has occurred: " + error.message;

//   return (
//     <div>
//       <table className="candidate-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>Phone Number</th>
//             <th>Applied Position</th>
//             <th>Language</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate) => (
//             <tr key={candidate.id} onClick={showInfo}>
//               <td>{candidate.name}</td>
//               <td>{candidate.email}</td>
//               <td>{candidate.gender}</td>
//               <td>{candidate.phone_number}</td>
//               <td>{candidate.position.name}</td>
//               <td>
//                 {" "}
//                 {candidate.specific_languages
//                   .map((language) => language.devlanguage.name)
//                   .join(", ")}
//               </td>
//               <td>
//                 <Link to={`/candidates/${candidate.id}`}>View Details</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
