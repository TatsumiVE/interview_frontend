import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";

export const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/interviewers?page=${currentPage}&search=${searchText}`
        );
        setInterviewers(response.data.data);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getEmployee();
  }, [currentPage, searchText]);

  const columns = useMemo(
    () => [
      { Header: "No.", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Position", accessor: "position_id.name" },
      { Header: "Department", accessor: "position_id.department.name" },
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
      data: interviewers,
      initialState: { pageIndex: currentPage - 1 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  return (
    <div>
      <button type="button">
        <Link to="create">Create Interviewer</Link>
      </button>

      <div className="pagination-search-container">
        <div className="search-container">
          <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
        </div>
        
      </div>
        <div className="table-container">
          <table {...getTableProps()} className="custom-table">
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
      </div> 
      
 
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


    






//v1
// import axios from "axios";
// import { useState } from "react";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";

// export const Employee = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchText, setSearchText] = useState("");

//   const getEmployee = async () => {
//     console.log("here");
//     const response = await axios.get(
//       `http://localhost:8000/api/interviewers?page=${currentPage}&search=${searchText}`
//     );
//     console.log(response.data.data);

//     return response.data.data;
//   };

//   const {
//     data: interviewers,
//     isSuccess,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["get", "interviewers", currentPage, searchText],
//     queryFn: getEmployee,
//   });

//   if (isLoading) return "Loading.....";
//   if (isError) return "Something went wrong";
//   if (error) return "An error has occurred: " + error.message;

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handleSearch = async (event) => {
//     const searchTerm = event.target.value;
//     setSearchText(searchTerm);

//     setCurrentPage(1); // Reset to the first page when performing a new search

//     const response = await axios.get(
//       `http://localhost:8000/api/interviewers?page=1&search=${searchTerm}`
//     );
//     console.log(response.data.data);
//     return response.data.data;
//   };

//   return (
//     <div>
//       <button type="button">
//         <Link to="create">Create Interviewer</Link>
    
        
//       </button>

//       <div className="pagination-search-container">
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchText}
//             onChange={handleSearch}
//           />
//         </div>
//         <div className="pagination-container">
//           <button
//             type="button"
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span>Page {currentPage}</span>
//           <button type="button" onClick={handleNextPage}>
//             Next
//           </button>
//         </div>
//       </div>

//       {isSuccess && interviewers.length > 0 ? (
//         <div className="table-container">
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Name</th>
//                 <th>Position</th>
//                 <th>Department</th>
//               </tr>
//             </thead>
//             <tbody>
//               {interviewers.map((interviewer) => (
//                 <tr key={interviewer.id}>
//                   <td>{interviewer.id}</td>
//                   <td>{interviewer.name}</td>
//                   <td>{interviewer.position_id.name}</td>
//                   <td>{interviewer.position_id.department.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Interviewer list not found</p>
//       )}
//     </div>
//   );
// };
