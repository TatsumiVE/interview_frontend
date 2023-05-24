
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Button } from "../../components";

export const Employee = () => {
  const { data: interviewers, isLoading, isError } = useQuery(
    "interviewers",
    async () => {
      const response = await axios.get("http://localhost:8000/api/interviewers");
      return response.data.data;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }


  const { globalFilter, pageIndex } = state;
  return (

    <div className="table-wrap">
      <div className="table-wrap__head">
        <div className="search-content">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="create-content">
          <Button>
            <Link to="create">Create Interviewer</Link>
          </Button>

        </div>
        
      </div>


      <div className="table-wrap__main">
        <table className="custom-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interviewers.map((interviewer, index) => (
              <tr key={interviewer.id}>
                <td>{interviewer.id}</td>
                <td>{interviewer.name}</td>
                <td>{interviewer.email}</td>
                <td>{interviewer.department_id.name}</td>
                <td>{interviewer.position_id.name}</td>
                <td>
                  <button type="button">
                    <Link to ={`user/create/${interviewer.id}`}>Create User</Link>                  
  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useTable, usePagination, useGlobalFilter } from "react-table";
// import axios from "axios";
// import { Button } from "../../components";

// export const Employee = () => {
//   const [interviewers, setInterviewers] = useState([]);

//   const getInterviewers = async () => {
//     const response = await axios.get("http://localhost:8000/api/interviewers");
//     return response.data.data;
//   };

//   useEffect(() => {
//     const fetchInterviewers = async () => {
//       const data = await getInterviewers();
//       setInterviewers(data);
//     };
//     fetchInterviewers();
//   }, []);

//   const columns = useMemo(
//     () => [
//       { Header: "No.", accessor: "id" },
//       { Header: "Name", accessor: "name" },
//       { Header: "Email", accessor: "email" },
//       { Header: "Department", accessor: "department_id.name" },
//       { Header: "Position", accessor: "position_id.name" },
//       { Header: "Action", accessor: "cid", Cell: ({ id }) => <Link to={`user/create/${id}`}>Create User</Link> },
      
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     state,
//     setGlobalFilter,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data: interviewers,
//       initialState: { pageIndex: 0 },
//     },
//     useGlobalFilter,
//     usePagination
//   );

//   const { globalFilter, pageIndex } = state;

//   return (
//     <div className="table-wrap">
//       <div className="table-wrap__head">
//         <div className="search-content">
//           <input
//               type="text"
//               value={globalFilter || ""}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               placeholder="  Search..."
//             />
//           </div>
//           <div className="create-content">
//             <button type="button" className="txt-light btn-primary" text="Create Interviewer">
//               <Link to="create">Create Interviewer</Link>
//             </button>
//           </div>
//       </div>
 
//       <div className="table-wrap__main">
//         <table {...getTableProps()} className="custom-table">
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div className="table-wrap__pagination">
//         <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
//            &lt;&lt;
//         </button>
//         <span className="page-content">
//           Page {""}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </span>
//         <button onClick={() => nextPage()} disabled={!canNextPage} >
//            &gt;&gt;
//         </button>
        
//       </div>
//     </div>
//   );
// };




//v3
// import React from "react";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { Link } from "react-router-dom";
// export const Employee = () => {
//   const { data: interviewers, isLoading, isError } = useQuery("interviewers", async () => {
//     const response = await axios.get("http://localhost:8000/api/interviewers");
//     return response.data.data;
//   });

//   const columns = [
//     { Header: "No.", accessor: "id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Department", accessor: "department_id.name" },
//     { Header: "Position", accessor: "position_id.name"}
//   ];

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching interviewers.</div>;
//   }

//   return (
//     <div className="table-wrap">
//       <div className="table-wrap__head">
//         <div className="create-content">
//           <button type="button" className="txt-light btn-primary">
//             <Link to="create">Create Interviewer</Link>
//           </button>
//         </div>
//       </div>

//       <div className="table-wrap__main">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               {columns.map((column) => (
//                 <th key={column.Header}>{column.Header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {interviewers.map((interviewer) => (
//               <tr key={interviewer.id}>
//                 {columns.map((column) => (
//                   <td key={column.accessor}>
//                     {column.accessor
//                       .split(".")
//                       .reduce((obj, accessor) => obj?.[accessor], interviewer)}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };




//v2
// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useTable, usePagination, useGlobalFilter } from "react-table";
// import axios from "axios";
// import { Input,Button } from "../../components";

// export const Employee = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchText, setSearchText] = useState("");
//   const [interviewers, setInterviewers] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {  
//     const getEmployee = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/interviewers?page=${currentPage}&search=${searchText}`
//         );
//         setInterviewers(response.data.data);
//         setIsSuccess(true);
//       } catch (error) {
//         setIsError(true);
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getEmployee();
//   }, [currentPage, searchText]);

//   const columns = useMemo(
//     () => [
//       { Header: "No.", accessor: "id" },
//       { Header: "Name", accessor: "name" },
//       { Header: "Position", accessor: "position_id.name" },
//       { Header: "Department", accessor: "position_id.department.name" },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     state,
//     setGlobalFilter,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data: interviewers,
//       initialState: { pageIndex: currentPage - 1 },
//     },
//     useGlobalFilter,
//     usePagination
//   );

//   const { globalFilter, pageIndex } = state;
//   return (
//     <div className="table-wrap">
//       <div className="table-wrap__head">
//         <div className="search-content">
//           <Input
//             type="text" 
//             className="search-input"          
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search..."
//           />
//         </div> 
//         <div className="create-content">
//         <button type="button" className="txt-light btn-primary" text="Create Interviewer">
//             <Link to="create">Create Interviewer</Link>
//           </button> 
//         </div>             
//       </div>

//         {/* <div className="table-wrap__button">
//           <button type="button" className="txt-light btn-primary">
//             <Link to="create">Candidate create</Link>
//           </button>
//         </div>     
//         <div className="search-container">
//           <Input
//             type="text"
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search..."
//           />
//         </div>         */}
     
//         <div className="table-wrap__main">
//           <table {...getTableProps()} className="custom-table">
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         </div> 
      
 
//     <div className="table-wrap__pagination">
//       <Button type="button" onClick={() => previousPage() }  text="Previous" />
       
     
//       <span>
//         Page{' '}
//         <strong>
//           {pageIndex + 1} of {pageOptions.length}
//         </strong>
//       </span>
//       <Button type="button" onClick={() => nextPage()}  text="Next" />
       
//     </div>
//   </div>
// );
// };



    




    





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
