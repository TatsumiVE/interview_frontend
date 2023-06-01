import axios from "axios";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { useMemo } from "react";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import Can from "../../components/utilites/can";
import languageService from "../../services/languageService";

import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { Dropdown, ButtonLink } from "../../components";

export const InterviewList = () => {
  const { token, user } = useAuth();
  const queryClient = new QueryClient();
  const [language, setLanguage] = useState("All");
  const [stageFilter, setStageFilter] = useState("");

  const [candidateList, setCandidateList] = useState([]);
  const [interviewList, setInterviewList] = useState([]);

  const today = new Date();
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
      "http://127.0.0.1:8000/api/candidates-detail",
      config
    );
    return response.data.data;
  };

  const handleTerminate = (candidateId) => {
    interviewTerminate(candidateId);
  };

  const terminateProcess = async (id) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/interview-process/terminate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const check = (candidate) => {
    const interviews = candidate.interviews || [];
    const lastInterview = interviews[interviews.length - 1] || {};
    const lastStage = lastInterview.interview_stage?.stage_name || 0;

    const canCreate = !(
      lastStage &&
      lastStage > 3 &&
      !lastInterview.interview_result
    );

    const canAssessment = lastStage && !lastInterview.interview_result;

    const canResult = lastStage && !lastInterview.interview_result;

    return {
      canCreate,
      canAssessment,
      canResult,
      lastStage,
    };
  };

  const findStageId = (candidateId) => {
    const candidate = candidateList.find(
      (candidate) => candidate.id === candidateId
    );

    if (candidate && candidate.interview.length > 0) {
      const lastInterview =
        candidate.interviews[candidate.interviews.length - 1];
      if (
        lastInterview.interview_stage &&
        lastInterview.interview_stage.stage_name !== undefined
      ) {
        return lastInterview.interview_stage.id;
      } else {
        return "Unknown stage";
      }
    } else {
      return 1;
    }
  };

  const {
    data: languages,
    isLoading: isLanguageLoading,
    isError: isLanguageError,
    isSuccess: isLanguageSuccess,
    error: languageError,
  } = useQuery(["get", "languages"], () => languageService.getAll(token));

  const { mutate: interviewTerminate } = useMutation({
    mutationKey: ["post", "interview-process", "terminate"],
    mutationFn: terminateProcess,
    onSuccess: () => {
      queryClient.invalidateQueries(["get", "candidates"]);
    },
  });

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["get", "candidates-detail"],
    queryFn: getCandidates,
  });

  // useEffect(() => {
  //   if (data) {
  //     setCandidateList(data.map((d) => d.candidate));
  //     setInterviewList(data.map((d) => d.interview));
  //     console.log(candidateList);
  //     console.log(interviewList);
  //   }
  // }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  const [a, b] = useState([]);
  useEffect(() => {
    b(
      language === "All"
        ? candidateList
        : candidateList.filter((candidate) => {
            return candidate.specific_languages
              .map((lan) => lan.devlanguage.name)
              .includes(language);
          })
    )?.filter((candidate) => {
      const date = candidate?.interviews[0]?.interview_stage?.interview_date;
      return startDateFilter <= date && date <= endDateFilter;
    });
  }, [candidateList, startDateFilter, endDateFilter, language]);

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        Cell: ({ row }) => {
          return <div>{row.index + 1}.</div>;
        },
      },
      { Header: "Name", accessor: "candidate.name" },
      { Header: "Email", accessor: "candidate.email" },
      { Header: "Gender", accessor: "candidate.gender" },
      { Header: "Phone Number", accessor: "candidate.phone_number" },
      // {
      //   Header: "Interview Date",
      //   accessor: (row) =>
      //     row.interviews[0]?.interview_stage?.interview_date || "-",
      // },
      // { Header: "Applied Position", accessor: "position.name" },
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
            &nbsp;
            <Can permission={"remarkAssessmentCreate"}>
              <Link
                to={`assessment`}
                state={{
                  candidateId: data.candidate.id,
                  interviewerId: user.id,
                }}
                style={{
                  pointerEvents: check(data.candidate).canAssessment
                    ? "all"
                    : "none",
                  background: check(data.candidate).canAssessment
                    ? "green"
                    : "red",
                }}
              >
                Assessment
              </Link>
            </Can>
            <Can permission={"interviewSummarize"}>
              <Link
                to={`result`}
                state={{
                  candidateId: data.candidate.id,
                  stageId: findStageId(data.candidate.id),
                  candidateName: data.candidate.name,
                }}
                style={{
                  pointerEvents: check(data.candidate).canResult
                    ? "all"
                    : "none",
                  background: check(data.candidate).canResult ? "green" : "red",
                }}
              >
                Result
              </Link>
            </Can>
            <Can permission={"interviewProcessTerminate"}>
              <button
                type="button"
                onClick={() => {
                  handleTerminate(data.candidate.id);
                }}
              >
                Terminate
              </button>
            </Can>
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
      data: data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <button type="button">
        <Link to="/candidates/create">Create Candidate</Link>
      </button>
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

      <button type="button" onClick={() => setStageFilter(1)}>
        stage1
      </button>
      <button type="button" onClick={() => setStageFilter(2)}>
        stage2
      </button>
      <button type="button" onClick={() => setStageFilter(3)}>
        stage3
      </button>

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
      <span>Count: {candidateList.length}</span>
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

//           {isSuccess && candidateList.length > 0 ? (
//             candidateList.map((candidate) => (
//               <tr key={candidate.id}>
//                 {console.log(candidate)}
//                 <td>{candidate.name}</td>
//                 <td>{candidate.email}</td>

//                 <td>
//                   {candidate.gender == 1
//                     ? "Male"
//                     : candidate.gender == 2
//                     ? "Female"
//                     : "Non-Binary"}
//                 </td>
//                 <td>{candidate.phone_number}</td>
//                 {/* <td>{candidate.position.name}</td> */}
//                 <td>
//                   {candidate.specific_languages
//                     .map((language) => language.devlanguage.name)
//                     .join(", ")}
//                 </td>
//                 <td>
//                   &nbsp;

//                   <Can permission={"remarkAssessmentCreate"}>
//                     <Link
//                       to={`assessment`}
//                       state={{
//                         candidateId: candidate.id,
//                         interviewerId: user.id,
//                       }}
//                       style={{
//                         pointerEvents: check(candidate).canAssessment
//                           ? "all"
//                           : "none",
//                         background: check(candidate).canAssessment
//                           ? "green"
//                           : "red",
//                       }}
//                     >
//                       Assessment
//                     </Link>
//                   </Can>
//                   {/* <Can permission={"interviewSummarize"}>
//                     <Link
//                       to={`result`}
//                       state={{
//                         candidateId: candidate.id,
//                         stageId: findStageId(candidate.id),
//                         candidateName: candidate.name,
//                       }}
//                       style={{
//                         pointerEvents: check(candidate).canResult
//                           ? "all"
//                           : "none",
//                         background: check(candidate).canResult
//                           ? "green"
//                           : "red",
//                       }}
//                     >
//                       Result
//                     </Link>
//                   </Can> */}
//                   <Can permission={"interviewProcessTerminate"}>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         handleTerminate(candidate.id);
//                       }}
//                     >
//                       Terminate
//                     </button>
//                   </Can>
//                 </td>
//                 {/* <td>
//                   {candidate?.interview[0]?.interview_stage?.interview_date}
//                 </td> */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">
//                 {isLoading ? "Loading..." : "No candidates found."}
//               </td>
//             </tr>
//           )}{" "}
//         </tbody>
//       </table>
//     </div>
//   );
// };
