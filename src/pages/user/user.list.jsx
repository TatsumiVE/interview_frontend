
import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../store/AuthContext";
import { ButtonLink } from '../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader';
import Can from '../../components/utilites/can';

export const UserList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const location = useLocation();
  const { successMessage } = location.state || {};
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:8000/api/users",
          config
        );
        const users = usersResponse.data.data;

        const interviewerResponse = await axios.get(
          "http://localhost:8000/api/interviewers",
          config
        );
        const interviewers = interviewerResponse.data.data;

        const filteredUsers = users.filter((user) => user.interviewer === id);
        const usersWithInterviewers = filteredUsers.map((user) => {
          const interviewer = interviewers.find(
            (interviewer) => interviewer.id === user.interviewer
          );

          return {
            ...user,
            interviewer: interviewer || {},
          };
        });
        setUsers(usersWithInterviewers);

        if (successMessage) {
          toast.success(successMessage);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        Cell: ({ row }) => {
          return <div>{row.index + 1}.</div>;
        },
      },
      { Header: "Name", accessor: "interviewer_id.name" },
      { Header: "Email", accessor: "interviewer_id.email" },
      { Header: "Role", accessor: "role[0].name" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <Can permission={"userUpdate"}>
              <ButtonLink
                type="button"
                className="btn-success"
                route={`update/${row.original.id}`}
                text="Edit"
                linkText="txt-light txt-sm"
                icon="fa-solid fa-pen-to-square"
              />
            </Can>
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
    rows,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: users,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  if (users.length === 0) return <Loader />;
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
              {page.map((row, i) => {
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
            Page{" "}
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
