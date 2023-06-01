// import { useMemo, useState, useEffect } from "react";
// import { useTable, useGlobalFilter, usePagination } from "react-table";
// import PropTypes from "prop-types";
// import Can from "../../components/utilites/can";
// import axios from "axios";
// import { useAuth } from "../../store/AuthContext";
// import Loader from "../../components/loader";
// import { ButtonLink } from "../../components";
// import { useQuery } from "react-query";
// import { Dropdown } from "../../components";
// import languageService from "../../services/languageService";
// export const Candidate = () => {
//   const [candidateData, setCandidateData] = useState([]);
//   const { token } = useAuth();
//   const [language, setLanguage] = useState("All");
//   const getCandidates = async () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(
//       "http://127.0.0.1:8000/api/candidates",
//       config
//     );
//     return response.data.data;
//   };

//   const {
//     data: languages,
//     isLoading: isLanguageLoading,
//     isError: isLanguageError,
//     isSuccess: isLanguageSuccess,
//     error: languageError,
//   } = useQuery(["get", "languages"], () => languageService.getAll(token));

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       const data = await getCandidates();
//       setCandidateData(data);
//     };

//     fetchCandidates();
//   }, []);

//   const candidateToShow =
//     language === "All"
//       ? candidateData
//       : candidateData.filter((candidate) => {
//           return candidate.specific_languages
//             .map((lan) => lan.devlanguage.name)
//             .includes(language);
//         });

//   const columns = useMemo(
//     () => [
//       {
//         Header: "No.",
//         Cell: ({ row }) => {
//           return <div>{row.index + 1}.</div>;
//         },
//       },
//       { Header: "Name", accessor: "name" },
//       { Header: "Email", accessor: "email" },
//       { Header: "Gender", accessor: "gender" },
//       { Header: "Phone Number", accessor: "phone_number" },
//       { Header: "Applied Position", accessor: "position.name" },
//       {
//         Header: "Language",
//         accessor: (row) =>
//           row.specific_languages
//             .map((language) => language.devlanguage.name)
//             .join(", "),
//       },
//       {
//         Header: "Action",
//         Cell: ({ row }) => (
//           <>
//             <Can permission={"candidateShow"}>
//               <ButtonLink
//                 type="button"
//                 className="btn-info"
//                 route={`/candidates/${row.original.id}`}
//                 text="View"
//                 linkText="txt-light txt-sm"
//               />
//             </Can>
//             &nbsp;
//             <Can permission={"candidateDelete"}>
//               <ButtonLink
//                 type="button"
//                 className="btn-success"
//                 route={`/candidates/update/${row.original.id}`}
//                 text="Update"
//                 linkText="txt-light txt-sm"
//               />
//             </Can>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     state,
//     setGlobalFilter,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data: candidateData,
//       initialState: { pageIndex: 0 },
//     },
//     useGlobalFilter,
//     usePagination
//   );

//   const { globalFilter, pageIndex } = state;
//   if (isLanguageLoading) return <Loader />;
//   if (isLanguageError) return "Something went wrong";
//   if (candidateData.length === 0) return <Loader />;
//   return (
//     <>
//       <Dropdown
//         labelName="Language"
//         options={[{ id: 0, name: "All" }, ...languages]}
//         onChange={(e) => {
//           setLanguage(
//             [{ id: 0, name: "All" }, ...languages][e.target.value].name
//           );
//         }}
//         hide={true}
//       />
//       <div className="table-wrap">
//         <div className="table-wrap__head">
//           <div className="search-content">
//             <input
//               type="text"
//               value={globalFilter || ""}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               placeholder="  Search..."
//             />
//           </div>
//         </div>
//         <div className="table-wrap__main">
//           <table {...getTableProps()} className="custom-table">
//             <thead>
//               {headerGroups.map((headerGroup, index) => (
//                 <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                   {headerGroup.headers.map((column, columnIndex) => (
//                     <th {...column.getHeaderProps()} key={columnIndex}>
//                       {column.render("Header")}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody {...getTableBodyProps()}>
//               {page.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()} key={row.id}>
//                     {row.cells.map((cell) => (
//                       <td {...cell.getCellProps()} key={cell.column.id}>
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="table-wrap__pagination">
//           <button
//             onClick={() => previousPage()}
//             disabled={!canPreviousPage}
//             className="txt-primary"
//           >
//             &lt;&lt;
//           </button>
//           <span className="page-content">
//             Page
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>
//           </span>
//           <button
//             onClick={() => nextPage()}
//             disabled={!canNextPage}
//             className="txt-primary"
//           >
//             &gt;&gt;
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// Candidate.propTypes = {
//   row: PropTypes.shape({
//     original: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }),
//   }),
// };
import { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import PropTypes from "prop-types";
import Can from "../../components/utilites/can";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import Loader from "../../components/loader";
import { ButtonLink } from "../../components";
import { useQuery } from "react-query";
import { Dropdown } from "../../components";
import languageService from "../../services/languageService";

export const Candidate = () => {
  const { token } = useAuth();
  const [candidateData, setCandidateData] = useState([]);
  const [language, setLanguage] = useState("All");
  const [grade, setGrade] = useState("");
  const today = new Date();
  const grades = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];
  const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDateFilter, setStartDateFilter] = useState(
    start.toLocaleDateString("af-ZA")
  );
  const [endDateFilter, setEndDateFilter] = useState(
    last.toLocaleDateString("af-ZA")
  );

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

  const {
    data: languages,
    isLoading: isLanguageLoading,
    isError: isLanguageError,
    isSuccess: isLanguageSuccess,
    error: languageError,
  } = useQuery(["get", "languages"], () => languageService.getAll(token));

  useEffect(() => {
    console.log("effect");
    getCandidates().then((data) => setCandidateData(data));
  }, []);

  const [a, b] = useState([]);
  useEffect(() => {
    b(
      language === "All"
        ? candidateData
        : candidateData.filter((candidate) => {
            return candidate.specific_languages
              .map((lan) => lan.devlanguage.name)
              .includes(language);
          })
    )?.filter((candidate) => {
      const date = candidate?.interviews[0]?.interview_stage?.interview_date;
      return startDateFilter <= date && date <= endDateFilter;
    });
  }, [candidateData, startDateFilter, endDateFilter, language]);

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
      { Header: "Gender", accessor: "gender" },
      { Header: "Phone Number", accessor: "phone_number" },
      {
        Header: "Interview Date",
        accessor: (row) =>
          row.interviews[0]?.interview_stage?.interview_date || "-",
      },
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
            <Can permission={"candidateShow"}>
              <ButtonLink
                type="button"
                className="btn-info"
                route={`/candidates/${row.original.id}`}
                text="View"
                linkText="txt-light txt-sm"
                icon="fa-solid fa-magnifying-glass"
              />
            </Can>
            &nbsp;
            <Can permission={"candidateDelete"}>
              <ButtonLink
                type="button"
                className="btn-success"
                route={`/candidates/update/${row.original.id}`}
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
      data: a,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  if (isLanguageLoading) return <Loader />;
  if (isLanguageError) return "Something went wrong";
  return (
    <>
      <Dropdown
        labelName="Language"
        options={[{ id: 0, name: "All" }, ...languages]}
        onChange={(e) => {
          console.log("id ", e.target.value);
          console.log(
            [{ id: 0, name: "All" }, ...languages].filter(
              (lan) => lan.id == e.target.value
            )[0].name
          );
          setLanguage(
            [{ id: 0, name: "All" }, ...languages].filter(
              (lan) => lan.id == e.target.value
            )[0].name
          );
        }}
        hide={true}
      />
      <Dropdown
        labelName="Grade"
        options={grades}
        onChange={(e) => setGrade(e.target.value)}
      />

      <input
        type="date"
        value={startDateFilter}
        onChange={(e) => {
          if (e.target.value > endDateFilter)
            return alert("start-date can't greater than end-date");
          setStartDateFilter(e.target.value);
        }}
      />
      <input
        type="date"
        value={endDateFilter}
        onChange={(e) => {
          setEndDateFilter(e.target.value);
        }}
      />
      <span>Count: {candidateData.length}</span>
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
          {page.length > 0 ? (
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
          ) : (
            <div>No Candidate Found</div>
          )}
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

Candidate.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
