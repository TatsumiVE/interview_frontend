import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../store/AuthContext";
import { useQuery } from "react-query";
import Can from "../../components/utilites/can";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";
import agencyService from "../../services/agencyService";
import Loader from "../../components/loader";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

export const AgencyList = () => {
  const { token } = useAuth();
  const [agencyList, setAgencyList] = useState([]);
  const location = useLocation();
  const { successMessage } = location.state || {};

  const {
    data: agencies,
    isLoading: isAgencyLoading,
    isError: isAgencyError,
    isSuccess: isAgencySuccess,
    error: agencyError,
  } = useQuery(["get", "agencies"], () => agencyService.getAll(token));

  useEffect(() => {
    agencies && isAgencySuccess && setAgencyList(agencies);

    if (successMessage) {
      toast.success(successMessage);
    }
  }, [agencies]);

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
          <Can permission={"agencyCreate"}>
            <ButtonLink
              type="button"
              className="btn-success"
              route={`update/${row.original.id}`}
              linkText="txt-light txt-sm"
              text="Edit"
              icon="fa-solid fa-pen-to-square"
            />
          </Can>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => agencyList || [], [agencyList]);

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
  if (isAgencyLoading) return <Loader />;
  if (isAgencyError) return "Something went wrong...";
  if (agencyError) return `An error has occurred: ${agencyError.message}`;

  return (
    <>
      <div className="toast-message">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          className="toast-message"
        />
      </div>

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
            <ButtonLink
              type="button"
              className="btn-primary"
              route="create"
              linkText="txt-light txt-sm"
              text="Create Agency"
              icon="fa-solid fa-user-plus"
            />
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
            Page
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
    </>
  );
};
