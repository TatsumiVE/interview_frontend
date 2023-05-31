import { useAuth } from "../../store/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { Link } from "react-router-dom";

export const CandidateList = () => {
  const { token, user, can } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  const [candidateList, setCandidateList] = useState([]);

  const getCandidates = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/api/candidates",
      config
    );

    setCandidateList(response.data.data);
  };

  useMemo(() => {
    getCandidates();
  }, []); // Fetch candidates on component mount

  const data = useMemo(() => candidateList, [candidateList]);

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
        Header: "Stage",
        accessor: "interviews.length",
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
        accessor: "specific_languages",
        Cell: ({ value }) =>
          value.map((language) => language.devlanguage.name).join(", "),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => {
          const candidate = candidateList.find((c) => c.id === value);
          const stageId = findStageId(value);
      
          return (
            <>
              {can("interviewProcessCreate") && (
                <Link to={`/candidate/interview/${value}/${candidate?.interviews?.length || 0}`}>
                  Interview
                </Link>
              )}
              /
              <Link to={`/candidate/interview-assessment/${value}/${user.id}`}>
                Assessment
              </Link>
              {can("interviewProcessUpdate") && (
                <Link
                  to={`/candidate/interview-result/${value}/${stageId}`}
                  state={{ candidateName: candidate?.name || "" }}
                >
                  Result
                </Link>
              )}
              {can("interviewProcessTerminate") && (
                <button type="button" onClick={() => handleTerminate(value)}>
                  Terminate
                </button>
              )}
            </>
          );
        },
      },
    ],
    [can, user]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const handleTerminate = (candidateId) => {
    interviewTerminate(candidateId);
  };

  const terminateProcess = async (id) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/interview-process/terminate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const interviewTerminate = async (candidateId) => {
    try {
      await terminateProcess(candidateId);
      getCandidates(); // Fetch candidates again to update the list
    } catch (error) {
      console.error("Termination error:", error);
    }
  };

  const findStageId = (candidateId) => {
    const candidate = candidateList.find((candidate) => candidate.id === candidateId);

    if (candidate && candidate.interviews.length > 0) {
      const lastInterview = candidate.interviews[candidate.interviews.length - 1];
      if (lastInterview.interview_stage && lastInterview.interview_stage.stage_name !== undefined) {
        return lastInterview.interview_stage.id;
      } else {
        return "Unknown stage";
      }
    } else {
      return 1;
    }
  };

  return (
    <div>
      {can("candidateCreate") && (
        <button type="button">
          <Link to="candidate/create">Create Candidate</Link>
        </button>
      )}
      {message && <div>{message}</div>}
      <div className="table-wrap">
      <div className="table-wrap__head">
        <div className="search-content">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="  Search..."
          />
        </div>       

      </div>
      <div className="table-wrap__main">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th {...column.getHeaderProps()} key={columnIndex}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-wrap__pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span className="page-content">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

const CandidateListWrapper = () => {
  return (
    <CandidateList />
  );
};

export default CandidateListWrapper;




// import { useAuth } from "../../store/AuthContext";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import {
//   useQuery,
//   useMutation,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// const queryClient = new QueryClient();

// export const CandidateList = () => {
//   const { token, user, can } = useAuth();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const message = searchParams.get("message");

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

//   const handleTerminate = (candidateId) => {
//     interviewTerminate(candidateId);
//   };
//   // state = [];
//   // terminate(){}; if(isSuccess) setState(state.map(c=> c.id===id ? {...c, status:1}))
//   // cTOShow = state.filter(c=> c.status===0)
//   // cToShow
//   // button
//   const terminateProcess = async (id) => {
//     const response = await axios.post(
//       `http://127.0.0.1:8000/api/interview-process/terminate/${id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   };

//   const { mutate: interviewTerminate } = useMutation({
//     mutationKey: ["post", "interview-process", "terminate"],
//     mutationFn: terminateProcess,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["get", "candidates"]);
//     },
//   });

//   const {
//     data: candidateList,
//     isLoading,
//     isError,
//     isSuccess,
//     error,
//   } = useQuery({
//     queryKey: ["get", "candidates"],
//     queryFn: getCandidates,
//   });

//   const findStageId = (candidateId) => {
//     const candidate = candidateList.find(
//       (candidate) => candidate.id === candidateId
//     );

//     if (candidate && candidate.interviews.length > 0) {
//       const lastInterview =
//         candidate.interviews[candidate.interviews.length - 1];
//       if (
//         lastInterview.interview_stage &&
//         lastInterview.interview_stage.stage_name !== undefined
//       ) {
//         return lastInterview.interview_stage.id;
//       } else {
//         return "Unknown stage";
//       }
//     } else {
//       return 1;
//     }
//   };

//   if (isLoading) return "Loading...";
//   if (isError) return "Something went wrong";
//   if (error) return "An error has occurred: " + error.message;
//   return (
//     <div>
//       {can("candidateCreate") && (
//         <button type="button">
//           <Link to="candidate/create">Create Candidate</Link>
//         </button>
//       )}
//       {message && <div>{message}</div>}
//       <table className="candidate-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Stage</th>
//             <th>Gender</th>
//             <th>Phone Number</th>
//             <th>Applied Position</th>
//             <th>Language</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isSuccess && candidateList.length > 0 ? (
//             candidateList.map((candidate) => (
//               <tr key={candidate.id}>
//                 <td>{candidate.name}</td>
//                 <td>{candidate.email}</td>
//                 <td>{candidate.interviews.length}</td>
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
//                   {can("interviewProcessCreate") && (
//                     <Link
//                       to={`/candidate/interview/${candidate.id}/${candidate.interviews.length}`}
//                     >
//                       Interview
//                     </Link>
//                   )}
//                   /
//                   <Link
//                     to={`/candidate/interview-assessment/${candidate.id}/${user.id}`}
//                   >
//                     Assessment
//                   </Link>
//                   {can("interviewProcessUpdate") && (
//                     <Link
//                       to={`/candidate/interview-result/${
//                         candidate.id
//                       }/${findStageId(candidate.id)}`}
//                       state={{ candidateName: candidate.name }}
//                     >
//                       Result
//                     </Link>
//                   )}
//                   {can("interviewProcessTerminate") && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         handleTerminate(candidate.id);
//                       }}
//                     >
//                       {" "}
//                       Terminate
//                     </button>
//                   )}
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
// const CandidateListWrapper = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <CandidateList />
//     </QueryClientProvider>
//   );
// };

// export default CandidateListWrapper;
