import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Can from "../components/utilites/can";
import {
  Dashboard,
  Candidate,
  Employee,
  NotFound,
  Login,
  CandidateCreate,
  CandidateDetails,
  InterviewList,
  CandidateUpdate,
  InterviewerCreate,
  InterviewResult,
  InterviewAssessment,
  UserCreate,
  InterviewerUpdate,
  InterviewCreate,
  CDetails,
  CCv,
  CStages,
  CInterviews,
  UserList,
  UserUpdate,
  AgencyList,
  AgencyCreate,
  AgencyUpdate,
  DepartmentList,
  DepartmentCreate,
  DepartmentUpdate,
  PositionList,
  PositionCreate,
  PositionUpdate,
  DevLanguageList,
  DevLanguageCreate,
  DevLanguageUpdate,
  RateList,
  RateCreate,
  RateUpdate,
  TopicList,
  TopicCreate,
  TopicUpdate,
} from "../pages";

import { Layout } from "../components";

export const Router = () => {
  const { isLogin } = useAuth();

  return (
    <Routes>
      {isLogin ? (
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <Can permission={"dashboardView"}>
                <Dashboard />
              </Can>
            }
          />
          <Route path="candidates">
            <Route
              index
              element={
                <Can permission={"candidateList"}>
                  <Candidate />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"candidateCreate"}>
                  <CandidateCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"candidateUpdate"}>
                  <CandidateUpdate />
                </Can>
              }
            />
            <Route
              path=":id"
              element={
                <Can permission={"getCandidateById"}>
                  <CandidateDetails />
                </Can>
              }
            >
              <Route index element={<Navigate to="details" replace />} />
              <Route
                path="details"
                element={
                  <Can permission={""}>
                    <CDetails />
                  </Can>
                }
              />
              <Route
                path="cv"
                element={
                  <Can permission={""}>
                    <CCv />
                  </Can>
                }
              />
              <Route
                path="stages"
                element={
                  <Can permission={""}>
                    <CStages />
                  </Can>
                }
              />
              <Route
                path="interviews"
                element={
                  <Can permission={""}>
                    <CInterviews />
                  </Can>
                }
              />
            </Route>
          </Route>
          <Route path="interviewer">
            <Route
              index
              element={
                <Can permission={"interviewerList"}>
                  <Employee />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"interviewerCreate"}>
                  <InterviewerCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"interviewerUpdate"}>
                  <InterviewerUpdate />
                </Can>
              }
            />
            <Route
              path="user/create/:id"
              element={
                <Can permission={"userCreate"}>
                  <UserCreate />
                </Can>
              }
            />
          </Route>
          <Route path="interview">
            <Route
              index
              element={
                <Can permission={"interviewList"}>
                  <InterviewList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"interviewProcessCreate"}>
                  <InterviewCreate />
                </Can>
              }
            />
            <Route
              path="assessment"
              element={
                <Can permission={"remarkAssessmentCreate"}>
                  <InterviewAssessment />
                </Can>
              }
            />
            <Route
              path="result"
              element={
                <Can permission={"interviewSummarize"}>
                  <InterviewResult />
                </Can>
              }
            />
          </Route>
          <Route path="interview">
            <Route index element={<InterviewList />} />
            <Route path="create" element={<InterviewCreate />} />
            <Route path="assessment" element={<InterviewAssessment />} />
            <Route path="result" element={<InterviewResult />} />
          </Route>

          <Route path="user">
            <Route
              index
              element={
                <Can permission={"userList"}>
                  <UserList />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"userUpdate"}>
                  <UserUpdate />
                </Can>
              }
            />
          </Route>

          <Route path="agency">
            <Route
              index
              element={
                <Can permission={"agencyList"}>
                  <AgencyList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"agencyCreate"}>
                  <AgencyCreate />
                </Can>
              }
            />
            <Route path="update/:id" element={<agencyUpdate />} />
          </Route>

          <Route path="department">
            <Route
              index
              element={
                <Can permission={"departmentList"}>
                  <DepartmentList />
                </Can>
              }
            />

            <Route
              path="create"
              element={
                <Can permission={"departmentCreate"}>
                  <DepartmentCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"departmentUpdate"}>
                  <DepartmentUpdate />
                </Can>
              }
            />
          </Route>
          <Route path="position">
            <Route
              index
              element={
                <Can permission={"positionList"}>
                  <PositionList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"positionCreate"}>
                  <PositionCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"positionUpdate"}>
                  <PositionUpdate />
                </Can>
              }
            />
          </Route>

          <Route path="rate">
            <Route
              index
              element={
                <Can permission={"rateList"}>
                  <RateList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"rateCreate"}>
                  <RateCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"rateUpdate"}>
                  <RateUpdate />
                </Can>
              }
            />
          </Route>
          <Route path="topic">
            <Route
              index
              element={
                <Can permission={"topicList"}>
                  <TopicList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"topicCreate"}>
                  <TopicCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"topicUpdate"}>
                  <TopicUpdate />
                </Can>
              }
            />
          </Route>

          <Route path="devlanguage">
            <Route
              index
              element={
                <Can permission={"languageList"}>
                  <DevLanguageList />
                </Can>
              }
            />
            <Route
              path="create"
              element={
                <Can permission={"languageCreate"}>
                  <DevLanguageCreate />
                </Can>
              }
            />
            <Route
              path="update/:id"
              element={
                <Can permission={"languageUpdate"}>
                  <DevLanguageUpdate />
                </Can>
              }
            />
          </Route>
        </Route>
      ) : (
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
