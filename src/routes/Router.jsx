import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
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
          <Route path="dashboard" element={<Dashboard />} />

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

          <Route path="*" element={<NotFound />} />

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
            <Route path="create" element={<PositionCreate />} />
            <Route path="update/:id" element={<PositionUpdate />} />
          </Route>

          <Route path="rate">
            <Route index element={<RateList />} />
            <Route path="create" element={<RateCreate />} />
            <Route path="update/:id" element={<RateUpdate/>} />
          </Route>
          <Route path="topic">
            <Route index element={<TopicList />} />
            <Route path="create" element={<TopicCreate />} />
            <Route path="update/:id" element={<TopicUpdate/>} />
          </Route>

          <Route path="devlanguage">
            <Route index element={<DevLanguageList />} />
            <Route path="create" element={<DevLanguageCreate />} />
            <Route path="update/:id" element={<DevLanguageUpdate />} />
          </Route>
        </Route>
      ) : (
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Route>
      )}
    </Routes>
  );
};
