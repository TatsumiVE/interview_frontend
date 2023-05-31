import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { ButtonLink } from "../../components";

export const DevLanguageList = () => {
    const { token } = useAuth();
    const [devlanguageList, setDevlanguageList] = useState([]);

    useEffect(() => {
        const getDevlanguage = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/dev-languages",
                    config
                );
                setDevlanguageList(response.data.data);
            } catch (error) {
                // Handle error
            }
        };

        getDevlanguage();
    }, [token]);

    const columns = useMemo(
        () => [
            {
                Header: "Devlanguage Id",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <ButtonLink type="button" className="btn-success" route={`update/${row.original.id}`} text="Update" linkText="txt-light txt-sm" />
                ),
            },
        ],
        []
    );

    const data = useMemo(() => devlanguageList || [], [devlanguageList]);

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
                    <ButtonLink type="button" className="btn-primary" route="create" linkText="txt-light txt-sm" text="Create Language" />
                </div>
            </div>
            <div className="table-wrap__main">
                <table {...getTableProps()} className="custom-table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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