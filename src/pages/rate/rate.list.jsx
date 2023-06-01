import { useState, useEffect, useMemo } from "react";
import rateService from "../../services/rateService";
import { useAuth } from "../../store/AuthContext";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";
import Loader from "../../components/loader";
import { useQuery } from "react-query";
import Can from "../../components/utilites/can";

export const RateList = () => {
  const { token } = useAuth();
  const [RateList, setRateList] = useState([]);

  const {
    data: rates,
    isLoading: isRateLoading,
    isError: isRateError,
    isSuccess: isRateSuccess,
    error: rateError,
  } = useQuery(["get", "rates"], () => rateService.getAll(token));

  useEffect(() => {
    rates && setRateList(rates);
  }, [rates]);

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
          <Can permission={"rateUpdate"}>
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

  const data = useMemo(() => RateList || [], [RateList]);

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
  if (isRateLoading) return <Loader />;
  if (isRateError) return "Something went wrong...";
  if (rateError) return `An error has occurred: ${rateError.message}`;

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
          <Can permission={"positionCreate"}>
            <ButtonLink
              type="button"
              className="btn-primary"
              route="create"
              linkText="txt-light txt-sm"
              text="Create Position"
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
  );
};
