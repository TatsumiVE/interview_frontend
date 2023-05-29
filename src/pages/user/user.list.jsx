
import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../store/AuthContext";

export const UserList = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const { token } = useAuth();

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    console.log(users);
    useEffect(() => {
        const fetchData = async () => {

            try {
              
                const usersResponse = await axios.get('http://localhost:8000/api/users',config);
                const users = usersResponse.data.data;

                const interviewerResponse = await axios.get('http://localhost:8000/api/interviewers',config);
                const interviewers = interviewerResponse.data.data;

                const filteredUsers = users.filter(user => user.interviewer === id);
                const usersWithInterviewers = filteredUsers.map(user => {
                    const interviewer = interviewers.find(interviewer => interviewer.id === user.interviewer);

                    return {
                        ...user,
                        interviewer: interviewer || {},
                    };
                });
                setUsers(usersWithInterviewers);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const data = useMemo(() => users, [users]);

    const columns = useMemo(
        () => [
            { Header: 'Name', accessor: 'interviewer_id.name' },
            { Header: 'Email', accessor: 'interviewer_id.email' },
            { Header: 'Role', accessor:   'role[0].name'  },
            {
                Header: "Action",
                Cell: ({ row }) => (
                    <div>
                        <button type="button">
                            <Link to={`update/${row.original.id}`}>Update User</Link>
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
            data:users,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    return (
        <div className='table-wrap'>
            <div className="table-wrap__head">
                <div className="search-content">
                    <input
                        type="text"
                        value={globalFilter || ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className='table-wrap__main'>
                <table {...getTableProps()} className='custom-table'>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className='table-wrap__pagination'>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span className='page-content'>
                    Page {' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

