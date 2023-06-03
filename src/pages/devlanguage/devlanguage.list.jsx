import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";
import Can from "../../components/utilites/can";
import Loader from "../../components/loader";
import { useQuery } from "react-query";
import languageService from "../../services/languageService";
import { toast,ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

export const DevLanguageList = () => {
  const { token } = useAuth();
  const [devlanguageList, setDevlanguageList] = useState([]);
  const location = useLocation();
  const { successMessage } = location.state || {};
  const {
    data: languages,
    isLoading: isLanguageLoading,
    isError: isLanguageError,
    isSuccess: isLanguageSuccess,
    error: languageError,
  } = useQuery(["get", "languages"], () => languageService.getAll(token));

  useEffect(() => {
    languages && setDevlanguageList(languages);
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [languages,successMessage]);

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
          <Can permission={"languageUpdate"}>
            <ButtonLink
              type="button"
              className="btn-success"
              route={`update/${row.original.id}`}
              text="Edit"
              linkText="txt-light txt-sm"
              icon="fa-solid fa-pen-to-square"
            />
          </Can>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => devlanguageList , [devlanguageList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
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
      data:devlanguageList,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  if (isLanguageLoading) return <Loader />;
  if (isLanguageError) return "Something went wrong...";
  if (languageError) return `An error has occurred: ${languageError.message}`;
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} className="ToastContainer"/>
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
          <Can permission={"languageCreate"}>
            <ButtonLink
              type="button"
              className="btn-primary"
              route="create"
              linkText="txt-light txt-sm"
              text="Create Language"
              icon="fa-solid fa-plus"
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
