import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, usePagination } from "react-table";

export const DepartmentList = () => {
  const { token } = useAuth();
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    const getDepartment = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/departments",
          config
        );
        setDepartmentList(response.data.data);
      } catch (error) {
        // Handle error
      }
    };

    getDepartment();
  }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: "Department Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button type="button">
            <Link to={`update/${row.original.id}`}>Deprtment Update</Link>
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => departmentList || [], [departmentList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
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

  return (
    <>
      <div>
        <button type="button">
          <Link to="/department/create">Department Create</Link>
        </button>
      </div>
      <input
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
      <table {...getTableProps()}>
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
          {rows.map((row) => {
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
    </>
  );
};


















// import axios from "axios";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../store/AuthContext"

// export const DepartmentList = () => {

//   const {token} = useAuth();

//   const getDepartment = async () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/departments",
//       config
//     );
//     return response.data.data;
//   };

//   const {
//     data:departmentList
//   } = useQuery({
//     queryKey:["get","departments"],
//     queryFn:getDepartment,
//   });

//   return(
//     <>
//     <div>
//     <button type="button">
//       <Link to="/department/create">Department Create</Link>
//     </button>     
//     </div>
//     <table>
//       <thead>
//         <tr>
//           <th>Id</th>
//           <th>Name</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//       {departmentList && departmentList.map((depapartment) => (
//         <tr key={depapartment.id}>
//           <td>{depapartment.id}</td>
//           <td>{depapartment.name}</td>
//           <td>
//             <button type="button">
//               <Link to={`update/${depapartment.id}`}>Department Update</Link>
//             </button>
//           </td>
//         </tr>
//       ))}
//       </tbody>
//     </table>
//     </>
//   )
// }