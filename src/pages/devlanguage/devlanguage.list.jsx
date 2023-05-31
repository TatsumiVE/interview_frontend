import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, usePagination } from "react-table";

export const DevlanguageList = () => {
  const { token } = useAuth();
  const [devlanguageList, setDevlanguageList] = useState([]);

  useEffect(() => {
    const getDevlanguage = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dev-languages",
          config
        );
        setDevlanguageList(response.data.data);
      } catch (error) {
        // Handle error
      }
    };

    getDevlanguage();
  }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: "Devlanguage Id",
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
            <Link to={`update/${row.original.id}`}>Devlanguage Update</Link>
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => devlanguageList || [], [devlanguageList]);

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
          <Link to="/devlanguage/create">Devlanguage Create</Link>
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

// export const DevlanguageList = () => {

//   const {token} = useAuth();

//   const getDevlanguage = async () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/dev-languages",
//       config
//     );
//     return response.data.data;
//   };

//   const {
//     data:devlanguageList
//   } = useQuery({
//     queryKey:["get","dev-languages"],
//     queryFn:getDevlanguage,
//   });

//   return(
//     <>
//     <div>
//     <button type="button">
//       <Link to="/devlanguage/create">DevLanguage Create</Link>
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
//       {devlanguageList && devlanguageList.map((devlanguage) => (
//         <tr key={devlanguage.id}>
//           <td>{devlanguage.id}</td>
//           <td>{devlanguage.name}</td>
//           <td>
//             <button type="button">
//               <Link to={`update/${devlanguage.id}`}>Devlanguage Update</Link>
//             </button>
//           </td>
//         </tr>
//       ))}
//       </tbody>
//     </table>
//     </>
//   )
// }




// // export const DevLanguageList = () => {
// //   return(
// //     <>
// //     Hello
// //     </>
// //   )
// // }