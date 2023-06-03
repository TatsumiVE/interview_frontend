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
            <Route index element={<Candidate />} />
            <Route path="create" element={<CandidateCreate />} />
            <Route path="update/:id" element={<CandidateUpdate />} />
            <Route path=":id" element={<CandidateDetails />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<CDetails />} />
              <Route path="cv" element={<CCv />} />
              <Route path="stages" element={<CStages />} />
              <Route path="interviews" element={<CInterviews />} />
            </Route>
          </Route>
          <Route path="interviewer">
            <Route index element={<Employee />} />
            <Route path="create" element={<InterviewerCreate />} />
            <Route path="update/:id" element={<InterviewerUpdate />} />
            <Route path="user/create/:id" element={<UserCreate />} />
          </Route>
          <Route path="interview">
            <Route index element={<InterviewList />} />
            <Route path="create" element={<InterviewCreate />} />
            <Route path="assessment" element={<InterviewAssessment />} />
            <Route path="result" element={<InterviewResult />} />
          </Route>
          <Route path="interview">
            <Route index element={<InterviewList />} />
            <Route path="create" element={<InterviewCreate />} />
            <Route path="assessment" element={<InterviewAssessment />} />
            <Route path="result" element={<InterviewResult />} />
          </Route>

          <Route path="user">
            <Route index element={<UserList />} />
            <Route path="update/:id" element={<UserUpdate />} />
          </Route>

          <Route path="agency">
            <Route index element={<AgencyList />} />
            <Route path="create" element={<AgencyCreate />} />
            <Route path="update/:id" element={<AgencyUpdate />} />
          </Route>

          <Route path="department">
            <Route index element={<DepartmentList />} />
            <Route path="create" element={<DepartmentCreate />} />
            <Route path="update/:id" element={<DepartmentUpdate />} />
          </Route>
          <Route path="position">
            <Route index element={<PositionList />} />
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
            <Route index element={<RateList />} />
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
            <Route index element={<TopicList />} />
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
            <Route index element={<DevLanguageList />} />
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
