import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";
import Loader from "../../components/loader";
import Can from "../../components/utilites/can";
import departmentService from "../../services/departmentService";
export const DepartmentList = () => {
  const { token } = useAuth();
  const [departmentList, setDepartmentList] = useState([]);

  const {
    data: departments,
    isLoading: isDepartmentLoading,
    isError: isDepartmentError,
    isSuccess: isDepartmentSuccess,
    error: departmentError,
  } = useQuery(["get", "positions"], () => departmentService.getAll(token));

  useEffect(() => {
    departments && isDepartmentSuccess && setDepartmentList(departments);
  }, [departments]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        Cell: ({ row }) => {
          return <div>{row.index + 1}.</div>;
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <Can permission={"departmentUpdate"}>
            <ButtonLink
              type="button"
              className="btn-success"
              route={`update/${row.original.id}`}
              text="Update"
              linkText="txt-light txt-sm"
            />
          </Can>
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
  if (isDepartmentLoading) return <Loader />;
  if (isDepartmentError) return "Something went wrong...";
  if (departmentError)
    return `An error has occurred: ${departmentError.message}`;
  return (
    <div className="table-wrap">
      <div className="table-wrap__head">
        <div className="search-content">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="create-content">
          <Can permission={"departmentCreate"}>
            <ButtonLink
              type="button"
              className="btn-primary"
              route="create"
              linkText="txt-light txt-sm"
              text="Create Department"
            />
          </Can>
        </div>
      </div>

      <div className="table-wrap__main">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
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
      </div>
      <div className="table-wrap__pagination">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="txt-primary"
        >
          &lt;&lt;
        </button>
        <span className="page-content">
          Page {""}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="txt-primary"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
