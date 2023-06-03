import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { ButtonLink } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader";
import Can from "../../components/utilites/can";

export const Employee = () => {
  const [interviewers, setInterviewers] = useState([]);
  const { token } = useAuth();
  const location = useLocation();
  const { successMessage } = location.state || {};

  const getInterviewers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "http://localhost:8000/api/interviewers",
      config
    );
    return response.data.data;
  };

  useEffect(() => {
    const fetchInterviewers = async () => {
      const data = await getInterviewers();
      setInterviewers(data);

      if (successMessage) {
        toast.success(successMessage);
      }
    };
    fetchInterviewers();
  }, [successMessage]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        Cell: ({ row }) => {
          return <div>{row.index + 1}.</div>;
        },
      },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Department", accessor: "department_id.name" },
      { Header: "Position", accessor: "position_id.name" },

      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <Can permission={"userCreate"}>
              <ButtonLink
                type="button"
                className="btn-info"
                route={`user/create/${row.original.id}`}
                linkText="txt-light txt-sm"
                text="Create Role"
                icon="fa-solid fa-plus"
              />
            </Can>
            &nbsp;
            <Can permission={"interviewerUpdate"}>
              <ButtonLink
                type="button"
                className="btn-success"
                route={`/interviewer/update/${row.original.id}`}
                text="Edit"
                linkText="txt-light txt-sm"
                icon="fa-solid fa-pen-to-square"
              />
            </Can>
          </div>
        ),
      },
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
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  if (interviewers.length === 0) return <Loader />;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />

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
          <Can permission={"iinterviewerCreate"}>
            <div className="create-content">
              <ButtonLink
                type="button"
                className="btn-primary"
                route="create"
                linkText="txt-light txt-sm"
                text="Create Interviewer"
                icon="fa-solid fa-plus"
              />
            </div>
          </Can>
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
            type="button"
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
    </>
  );
};
