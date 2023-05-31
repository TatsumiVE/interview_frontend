import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, usePagination } from "react-table";

export const PositionList = () => {
  const { token } = useAuth();
  const [PositionList, setPositionList] = useState([]);

  useEffect(() => {
    const getPosition = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/positions",
          config
        );
        setPositionList(response.data.data);
      } catch (error) {
        // Handle error
      }
    };

    getPosition();
  }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: "Position Id",
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
            <Link to={`update/${row.original.id}`}>Position Update</Link>
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => PositionList || [], [PositionList]);

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
          <Link to="/position/create">Position Create</Link>
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





// export const PositionList = () => {
//   return(
//     <>
//     Hello
//     </>
//   )
// }