import axios from "axios";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { useMemo } from "react";
import { useAuth } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Can from "../../components/utilites/can";
import languageService from "../../services/languageService";

import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { Dropdown, ButtonLink, Input } from "../../components";

export const InterviewList = () => {
  const { token, user } = useAuth();

  const [language, setLanguage] = useState("All");
  const [stageFilter, setStageFilter] = useState(0);

  const [candidateList, setCandidateList] = useState([]);
  const navigate = useNavigate();
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

  const check = (interview) => {
    const lastInterview = interview[interview.length - 1] || {};
    const lastStage = lastInterview.interview_stage?.stage_name || 0;

    const assessments = lastInterview.interview_assign.map((assign) => ({
      userId: assign.interviewer_id,
      grade: assign.remarks[0]?.grade,
    }));

    const [assessment] = assessments?.filter((a) => a.userId == user.id);
    const hasAllGrades = assessments?.reduce(
      (a, b) => {
        return a?.grade && b?.grade ? { grade: true } : { grade: false };
      },
      {
        grade: true,
      }
    ).grade;

    const canCreate = !(
      (lastStage && !lastInterview.interview_result) ||
      lastStage > 2
    );

    const canAssessment = lastStage && !assessment?.grade;

    const canResult =
      lastStage && hasAllGrades && !lastInterview.interview_result;

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
      navigate("/interview");
    },
  });

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["get", "candidates-detail"],
    queryFn: getCandidates,
  });

  const [a, b] = useState();
  useEffect(() => {
    b(
      (language === "All"
        ? data
        : data.filter(({ candidate }) => {
            return candidate.specific_languages
              .map((lan) => lan.devlanguage.name)
              .includes(language);
          })
      )
        ?.filter(({ interview }) => {
          const date = interview[0]?.interview_stage?.interview_date;

          return startDateFilter <= date && date <= endDateFilter;
        })
        ?.filter(({ interview }) => {
          return stageFilter === 0
            ? true
            : stageFilter ===
                interview[interview.length - 1]?.interview_stage.stage_name;
        })
    );
  }, [data, startDateFilter, endDateFilter, language, stageFilter]);
  const columns = useMemo(
    () =>
      a
        ? [
            {
              Header: "No.",
              Cell: ({ row }) => {
                return <div>{row.index + 1}.</div>;
              },
            },
            {
              Header: "Name",
              Cell: ({ row }) => <div>{row.original.candidate.name}</div>,
            },
            {
              Header: "Email",
              Cell: ({ row }) => <div>{row.original.candidate.email}</div>,
            },
            {
              Header: "Gender",
              Cell: ({ row }) => <div>{row.original.candidate.gender}</div>,
            },
            {
              Header: "Phone Number",
              Cell: ({ row }) => (
                <div>{row.original.candidate.phone_number}</div>
              ),
            },
            {
              Header: "Interview Date",
              Cell: ({ row }) =>
                row.original.interview[0]?.interview_stage?.interview_date ||
                "-",
            },
            {
              Header: "Applied Position",
              Cell: ({ row }) => row.original.candidate.position_id,
            },
            {
              Header: "Language",
              Cell: ({ row }) =>
                row.original.candidate.specific_languages
                  .map((language) => language.devlanguage.name)
                  .join(", "),
            },
            {
              Header: "Action",
              Cell: ({ row }) => {
                const candidate = row.original.candidate;
                const interview = row.original.interview;
                return (
                  <>
                    <Can permission={"interviewProcessCreate"}>
                      <Link
                        to={`create`}
                        state={{
                          id: candidate.id,
                          stageId: interview.length,
                        }}
                        style={{
                          pointerEvents: check(interview).canCreate
                            ? "all"
                            : "none",
                          background: check(interview).canCreate
                            ? "green"
                            : "red",
                        }}
                      >
                        Interview
                      </Link>
                    </Can>
                    &nbsp;
                    <Can permission={"remarkAssessmentCreate"}>
                      <Link
                        to={`assessment`}
                        state={{
                          candidateId: candidate.id,
                          interviewerId: user.id,
                        }}
                        style={{
                          pointerEvents: check(interview).canAssessment
                            ? "all"
                            : "none",
                          background: check(interview).canAssessment
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
                          candidateId: candidate.id,
                          interviewId: interview[interview.length - 1].id,
                          candidateName: candidate.name,
                        }}
                        style={{
                          pointerEvents: check(interview).canResult
                            ? "all"
                            : "none",
                          background: check(interview).canResult
                            ? "green"
                            : "red",
                        }}
                      >
                        Result
                      </Link>
                    </Can>
                    <Can permission={"interviewProcessTerminate"}>
                      <button
                        type="button"
                        onClick={() => {
                          handleTerminate(candidate.id);
                        }}
                      >
                        Terminate
                      </button>
                    </Can>
                    <Can permission={"candidateShow"}>
                      <ButtonLink
                        type="button"
                        className="btn-info"
                        route={`/candidates/${candidate.id}`}
                        text="View"
                        linkText="txt-light txt-sm"
                        icon="fa-solid fa-magnifying-glass"
                      />
                    </Can>
                  </>
                );
              },
            },
          ]
        : [],
    [a]
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

  if (isLoading) return <Loader />;
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Can permission={"candidateCreate"}>
        <button type="button">
          <Link to="/candidates/create">Create Candidate</Link>
        </button>
      </Can>

      <Dropdown
        labelName="Language"
        options={[{ id: 0, name: "All" }, ...languages]}
        onChange={(e) => {
          setLanguage(
            [{ id: 0, name: "All" }, ...languages].filter(
              (lan) => lan.id == e.target.value
            )[0].name
          );
        }}
        hide={true}
      />
      <button type="button" onClick={() => setStageFilter(0)}>
        All
      </button>
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
      <span>Count: {a?.length}</span>
      <div className="table-wrap">
        <div className="table-wrap__content">
          {/* <Dropdown
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
          /> */}

          {/* <Input
            labelName="Start Date"
            type="date"
            value={startDateFilter}
            onChange={(e) => {
              if (e.target.value > endDateFilter)
                return alert("start-date can't greater than end-date");
              setStartDateFilter(e.target.value);
            }}
          /> */}

          <Input
            labelName="End Date"
            type="date"
            value={endDateFilter}
            onChange={(e) => {
              setEndDateFilter(e.target.value);
            }}
          />
        </div>
        {/* <div className="table-wrap__content">
          <span>Candidate Count: {candidateList.length}</span>
        </div> */}
        {/* <div className="table-wrap__head">
          <div className="search-content">
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="  Search..."
            />
          </div>
          <div className="create-content">
            <Can permission={"candidateCreate"}>
              <ButtonLink
                type="button"
                className="btn-primary"
                route="/candidates/create"
                linkText="txt-light txt-sm"
                text="Create Candidate"
                icon="fa-solid fa-plus"
              />
            </Can>
          </div>
        </div> */}

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
