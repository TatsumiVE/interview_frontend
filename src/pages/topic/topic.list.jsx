import { useState, useEffect, useMemo } from "react";
import topicService from "../../services/topicService";
import { useAuth } from "../../store/AuthContext";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";
import Loader from "../../components/loader";
import { useQuery } from "react-query";
import Can from "../../components/utilites/can";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

export const TopicList = () => {
  const { token } = useAuth();
  const [TopicList, setTopicList] = useState([]);
  const location = useLocation();
  const { successMessage } = location.state || {};

  const {
    data: topics,
    isLoading: isTopicLoading,
    isError: isTopicError,
    isSuccess: istopicSuccess,
    error: topicError,
  } = useQuery(["get", "topics"], () => topicService.getAll(token));

  useEffect(() => {
    topics && setTopicList(topics);
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [topics,successMessage]);

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
          <Can permission={"topicUpdate"}>
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

  const data = useMemo(() => TopicList , [TopicList]);

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
      data:TopicList,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  if (isTopicLoading) return <Loader />;
  if (isTopicError) return "Something went wrong...";
  if (topicError) return `An error has occurred: ${topicError.message}`;

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
            <Can permission={"topicCreate"}>
              <ButtonLink
                type="button"
                className="btn-primary"
                route="create"
                linkText="txt-light txt-sm"
                text="Create Topic"
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
