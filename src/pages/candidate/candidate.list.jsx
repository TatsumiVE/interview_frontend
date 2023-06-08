import axios from "axios";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { useMemo } from "react";
import { useAuth } from "../../store/AuthContext";

import { useQuery } from "react-query";
import Can from "../../components/utilites/can";
import languageService from "../../services/languageService";

import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { Dropdown, ButtonLink, Input, Button } from "../../components";

export const Candidate = () => {
  const { token } = useAuth();

  const [language, setLanguage] = useState("All");
  const [stageFilter, setStageFilter] = useState(0);

  const remark = [
    { id: 0, name: "All" },
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];
  const [remarkFilter, setRemarkFilter] = useState(0);
  const today = new Date();
  const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const start = new Date(today.getFullYear(), today.getMonth(), 1);

  const [startDateFilter, setStartDateFilter] = useState(
    start.toLocaleDateString("af-ZA")
  );
  const [endDateFilter, setEndDateFilter] = useState(
    last.toLocaleDateString("af-ZA")
  );

  const stageCheck = (interview) => {
    const stage_name =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_stage?.stage_name;
    const interview_result =
      interview &&
      interview.length > 0 &&
      interview[interview.length - 1].interview_result;
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
    };
  };

  const getCandidates = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8000/api/candidates-detail/all",
      config
    );
    return response.data.data;
  };

  const { data: languages } = useQuery(["get", "languages"], () =>
    languageService.getAll(token)
  );

  const { data, isLoading, isError, error } = useQuery({
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
        ?.filter(({ interview }) => {
          let a =
            stageFilter == 0
              ? interview[interview?.length - 1]
              : interview[stageFilter - 1];
          return a?.interview_assign
            .map((interview_assign) => {
              return remarkFilter == 0
                ? true
                : remarkFilter == interview_assign.remarks[0]?.grade;
            })
            .reduce((previous, current) => {
              return previous || current;
            }, false);
        })
    );
  }, [
    data,
    startDateFilter,
    endDateFilter,
    language,
    stageFilter,
    remarkFilter,
  ]);
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
              Cell: ({ row }) =>
                row.original.interview[0]?.interview_stage?.interview_date ||
                "-",
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
              Header: "Action",
              Cell: ({ row }) => {
                const candidate = row.original.candidate;

                return (
                  <div className="btn-group">
                    <div div className="custom-input">
                      <Can permission={"getCandidateById"}>
                        <ButtonLink
                          type="button"
                          className="btn-primary"
                          route={`/candidates/${candidate.id}`}
                          text="View"
                          icon="fa-solid fa-magnifying-glass"
                        />
                      </Can>
                    </div>
                    <div className="custom-input">
                      <Can permission={"candidateUpdate"}>
                        <ButtonLink
                          type="button"
                          className="btn-primary"
                          route={`/candidates/update/${candidate.id}`}
                          text="Edit"
                          icon="fa-solid fa-pen-to-square"
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
    <>
      <div className="table-wrap">
        <div className="table-wrap__content">
          <div className="custom-input">
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
          </div>
          <div className="custom-input">
            <Dropdown
              labelName="Remark"
              options={remark}
              onChange={(e) => {
                setRemarkFilter(e.target.value);
              }}
              hide={true}
            />
          </div>
        </div>
        <div className="table-wrap__content">
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
          <div></div>
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
            <div className="c-notfound">No Candidate Found.</div>
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
