import { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { ButtonLink } from "../../components";

export const Candidate = () => {
  const [candidateData, setCandidateData] = useState([]);
  const { token } = useAuth();
  const getCandidates = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8000/api/candidates",
      config
    );
    return response.data.data;
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await getCandidates();
      setCandidateData(data);
    };

    fetchCandidates();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Phone Number", accessor: "phone_number" },
      { Header: "Applied Position", accessor: "position.name" },
      {
        Header: "Language",
        accessor: (row) =>
          row.specific_languages
            .map((language) => language.devlanguage.name)
            .join(", "),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <ButtonLink type="button" className="btn-info" route={`/candidates/${row.original.id}`} text="View" linkText="txt-light txt-sm" />
            &nbsp;
            <ButtonLink type="button" className="btn-success" route={`/candidates/update/${row.original.id}`} text="Update" linkText="txt-light txt-sm" />
          </>
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
      data: candidateData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  if (candidateData.length === 0) return "Loading...";

  return (
    <div className="table-wrap">
      <div className="table-wrap__head">
        <div className="search-content">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="  Search..."
          />
        </div>

      </div>
      <div className="table-wrap__main">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th {...column.getHeaderProps()} key={columnIndex}>
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
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-wrap__pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="txt-primary">
          &lt;&lt;
        </button>
        <span className="page-content">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="txt-primary">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

Candidate.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
