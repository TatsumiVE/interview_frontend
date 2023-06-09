import axios from "axios";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { useMemo } from "react";
import { useAuth } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import Can from "../../components/utilites/can";
import languageService from "../../services/languageService";

import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { TableContainer } from "@mui/material";
import { Dropdown, ButtonLink, Input, Button } from "../../components";
const queryClient = new QueryClient();

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
      (lastStage &&
        !(
          lastInterview.interview_result && lastInterview.interview_result == 1
        )) ||
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

  const canAssign = (data) => {
    return data.interview[data.interview.length - 1].interview_assign.filter(
      (a) => a.interviewer_id == user.id
    )[0]
      ? true
      : false;
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
    onSuccess: () => refetch(),
  });

  const stageCheck = (interview) => {
    const stage_name =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_stage?.stage_name;
    const interview_result =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_result;
    const date =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_stage?.interview_date;
    const time =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_stage?.interview_time;
    const result =
      interview_result == 1
        ? "Pass"
        : interview_result == 2
        ? "Fail"
        : "Pending";
    const name =
      stage_name == 1
        ? "First Interview"
        : stage_name == 2
        ? "Technical Interview"
        : stage_name == 3
        ? "Final Interview"
        : null;

    return {
      result,
      name,
      date,
      time,
    };
  };

  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
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
              Header: "Interview Stage",
              Cell: ({ row }) => {
                const interview = row.original.interview;
                const { name } = stageCheck(interview);
                return <div>{name}</div>;
              },
            },
            {
              Header: "Interview Result",
              Cell: ({ row }) => {
                const interview = row.original.interview;
                const { result } = stageCheck(interview);
                const resultClass =
                  result === "Pass"
                    ? "pass"
                    : result === "Fail"
                    ? "fail"
                    : "pending";

                return <div className={`result ${resultClass}`}>{result}</div>;
              },
            },

            {
              Header: "Interview Date",
              Cell: ({ row }) => {
                const interview = row.original.interview;
                const { date } = stageCheck(interview);
                return <div>{date} </div>;
              },
            },

            {
              Header: "Interview Time",
              Cell: ({ row }) => {
                const interview = row.original.interview;
                const { time } = stageCheck(interview);
                return <div>{time} </div>;
              },
            },

            {
              Header: "Applied Position",
              Cell: ({ row }) => row.original.candidate.position.name,
            },
            {
              Header: "Language",
              Cell: ({ row }) =>
                row.original.candidate.specific_languages
                  .map((language) => language.devlanguage.name)
                  .join(", "),
            },
            {
              Header: "Process",
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
                            ? "rgb(4, 96, 4)"
                            : "rgb(205, 30, 30)",
                        }}
                        className="link-process"
                      >
                        Interview
                      </Link>
                    </Can>
                    &nbsp;
                    <Can permission={"remarkAssessmentCreate"}>
                      {canAssign(row.original) ? (
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
                              ? "rgb(4, 96, 4)"
                              : "rgb(205, 30, 30)",
                          }}
                          className="link-process"
                        >
                          Assessment
                        </Link>
                      ) : null}
                    </Can>
                    &nbsp;
                    <Can permission={"interviewSummarize"}>
                      {canAssign(row.original) ? (
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
                              ? "rgb(4, 96, 4)"
                              : "rgb(205, 30, 30)",
                          }}
                          className="link-process"
                        >
                          Result
                        </Link>
                      ) : null}
                    </Can>
                  </>
                );
              },
            },
            {
              Header: "Action",
              Cell: ({ row }) => {
                const candidate = row.original.candidate;

                return (
                  <div className="btn-group">
                    <div className="custom-input">
                      <Can permission={"interviewProcessTerminate"}>
                        <Button
                          text="Teminate"
                          type="button"
                          className="btn-primary txt-light"
                          onClick={() => {
                            handleTerminate(candidate.id);
                          }}
                        />
                      </Can>
                    </div>
                    <div className="custom-input">
                      <Can permission={"candidateShow"}>
                        <ButtonLink
                          type="button"
                          className="btn-primary"
                          route={`/candidates/${candidate.id}`}
                          text="View"
                          icon="fa-solid fa-eye"
                        />
                      </Can>
                    </div>
                  </div>
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
    <div className="interview-list">
      <div className="table-wrap">
        <div className="table-wrap__content">
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
          <div className="custom-input">
            <Input
              labelName="Start Date"
              type="date"
              value={startDateFilter}
              onChange={(e) => {
                if (e.target.value > endDateFilter)
                  return alert("start-date can't greater than end-date");
                setStartDateFilter(e.target.value);
              }}
            />
          </div>
          <div className="custom-input">
            <Input
              labelName="End Date"
              type="date"
              value={endDateFilter}
              onChange={(e) => {
                setEndDateFilter(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="table-wrap__head">
          <div className="table-wrap__nav">
            <div className="custom-stage">
              <Button
                type="button"
                onClick={() => setStageFilter(0)}
                className={`btn-primary txt-light ${
                  stageFilter === 0 ? "active" : ""
                }`}
                text="All"
              />
            </div>
            <div className="custom-stage">
              <Button
                type="button"
                onClick={() => setStageFilter(1)}
                className={`btn-primary txt-light ${
                  stageFilter === 1 ? "active" : ""
                }`}
                text="First Interview"
              />
            </div>
            <div className="custom-stage">
              <Button
                type="button"
                onClick={() => setStageFilter(2)}
                className={`btn-primary txt-light ${
                  stageFilter === 2 ? "active" : ""
                }`}
                text="Technical Interview"
              />
            </div>
            <div className="custom-stage">
              <Button
                type="button"
                onClick={() => setStageFilter(3)}
                className={`btn-primary txt-light ${
                  stageFilter === 3 ? "active" : ""
                }`}
                text="Final Interview"
              />
            </div>
          </div>
          <div className="custom-input">
            <p>
              Candidate Count: <span className="badge">{a?.length}</span>
            </p>
          </div>

          <Can permission={"candidateCreate"}>
            <div className="create-content">
              <ButtonLink
                type="button"
                route="/candidates/create"
                text="Create Candidate"
                icon="fa-solid fa-plus"
                className="btn-primary candidate"
              />
            </div>
          </Can>
        </div>

        <TableContainer className="custom-scrollbar-x ">
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
              <div className="c-notfound">No Candidate Found.</div>
            )}
          </div>
        </TableContainer>
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
    </div>
  );
};
