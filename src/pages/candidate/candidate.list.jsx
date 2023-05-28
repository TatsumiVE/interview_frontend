import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter } from "react-table";

export const CandidateList = () => {
  const { token, user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCandidates = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/api/candidates",
          config
        );

        setCandidates(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
    };

    getCandidates();
  }, [token]);



  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: ({ value }) => {
          if (value === 1) return "Male";
          if (value === 2) return "Female";
          return "Non-Binary";
        },
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "Applied Position",
        accessor: "position.name",
      },
      {
        Header: "Language",
        accessor: (row) =>
          row.specific_languages
            .map((language) => language.devlanguage.name)
            .join(", "),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <Link to={`/candidate/interview/${row.original.id}`}>
              Interview
            </Link>
            /
            <Link
              to={`/candidate/interview-assessment/${row.original.id}/${user.id}`}
            >
              Assessment
            </Link>
          </div>
        ),
      },
    ],
    [user.id]
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
      data: candidates,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  const { globalFilter, pageIndex } = state;

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <button type="button">
        <Link to="candidate/create">Create Candidate</Link>
      </button>

      <input
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="  Search..."
      />

      <table className="candidate-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
          Page{" "}
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
CandidateList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};





// import { useAuth } from "../../store/AuthContext";
// import axios from "axios";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";

// export const CandidateList = () => {
//   const { token, user } = useAuth();

//   const getCandidates = async () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/candidates",
//       config
//     );

//     return response.data.data;
//   };

//   const {
//     data: candidates,
//     isLoading,
//     isError,
//     isSuccess,
//     error,
//   } = useQuery({
//     queryKey: ["get", "candidates"],
//     queryFn: getCandidates,
//   });

//   if (isLoading) return "Loading...";
//   if (isError) return "Something went wrong";
//   if (error) return "An error has occurred: " + error.message;
//   return (
//     <div>
//       <button type="button">
//         <Link to="candidate/create">Create Candidate</Link>
//       </button>
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
//           {isSuccess && candidates.length > 0 ? (
//             candidates.map((candidate) => (
//               <tr key={candidate.id}>
//                 <td>{candidate.name}</td>
//                 <td>{candidate.email}</td>
//                 <td>
//                   {candidate.gender == 1
//                     ? "Male"
//                     : candidate.gender == 2
//                     ? "Female"
//                     : "Non-Binary"}
//                 </td>
//                 <td>{candidate.phone_number}</td>
//                 <td>{candidate.position.name}</td>
//                 <td>
//                   {candidate.specific_languages
//                     .map((language) => language.devlanguage.name)
//                     .join(", ")}
//                 </td>
//                 <td>
//                   <Link to={`/candidate/interview/${candidate.id}`}>
//                     Interview
//                   </Link>
//                   /
//                   <Link
//                     to={`/candidate/interview-assessment/${candidate.id}/${user.id}`}
//                   >
//                     Assessment
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">
//                 {isLoading ? "Loading..." : "No candidates found."}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };