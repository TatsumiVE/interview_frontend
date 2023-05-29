import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { ButtonLink } from "../../components";

export const Employee = () => {
  const [interviewers, setInterviewers] = useState([]);
  const { token } = useAuth();
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
    };
    fetchInterviewers();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "No.", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Department", accessor: "department_id.name" },
      { Header: "Position", accessor: "position_id.name" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button type="button">
              <Link to={`user/create/${row.original.id}`}>Create Role</Link>
            </button>
            <button type="button">
              <Link to={`update/${row.original.id}`}>Update Interviewer</Link>
            </button>
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

  const { globalFilter, pageIndex } = state;

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
          <ButtonLink type="button" className="btn-primary" route="create" linkText="txt-light" text="Create Interviewer" />
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
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          &lt;&lt;
        </button>
        <span className="page-content">
          Page {""}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
