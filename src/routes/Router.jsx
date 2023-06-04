import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import CanRoute from "../components/utilites/canRoute";
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
              <CanRoute permission={"dashboardView"}>
                <Dashboard />
              </CanRoute>
            }
          />
          <Route path="candidates">
            <Route
              index
              element={
                <CanRoute permission={"candidateList"}>
                  <Candidate />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"candidateCreate"}>
                  <CandidateCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"candidateUpdate"}>
                  <CandidateUpdate />
                </CanRoute>
              }
            />
            <Route
              path=":id"
              element={
                <CanRoute permission={"getCandidateById"}>
                  <CandidateDetails />
                </CanRoute>
              }
            >
              <Route index element={<Navigate to="details" replace />} />
              <Route
                path="details"
                element={
                  <CanRoute permission={""}>
                    <CDetails />
                  </CanRoute>
                }
              />
              <Route
                path="cv"
                element={
                  <CanRoute permission={""}>
                    <CCv />
                  </CanRoute>
                }
              />
              <Route
                path="stages"
                element={
                  <CanRoute permission={""}>
                    <CStages />
                  </CanRoute>
                }
              />
              <Route
                path="interviews"
                element={
                  <CanRoute permission={""}>
                    <CInterviews />
                  </CanRoute>
                }
              />
            </Route>
          </Route>
          <Route path="interviewer">
            <Route
              index
              element={
                <CanRoute permission={"interviewerList"}>
                  <Employee />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"interviewerCreate"}>
                  <InterviewerCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"interviewerUpdate"}>
                  <InterviewerUpdate />
                </CanRoute>
              }
            />
            <Route
              path="user/create/:id"
              element={
                <CanRoute permission={"userCreate"}>
                  <UserCreate />
                </CanRoute>
              }
            />
          </Route>
          <Route path="interview">
            <Route
              index
              element={
                <CanRoute permission={"interviewList"}>
                  <InterviewList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"interviewProcessCreate"}>
                  <InterviewCreate />
                </CanRoute>
              }
            />
            <Route
              path="assessment"
              element={
                <CanRoute permission={"remarkAssessmentCreate"}>
                  <InterviewAssessment />
                </CanRoute>
              }
            />
            <Route
              path="result"
              element={
                <CanRoute permission={"interviewSummarize"}>
                  <InterviewResult />
                </CanRoute>
              }
            />
          </Route>
          {/* <Route path="interview">
            <Route index element={<InterviewList />} />
            <Route path="create" element={<InterviewCreate />} />
            <Route path="assessment" element={<InterviewAssessment />} />
            <Route path="result" element={<InterviewResult />} />
          </Route> */}

          <Route path="user">
            <Route
              index
              element={
                <CanRoute permission={"userList"}>
                  <UserList />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"userUpdate"}>
                  <UserUpdate />
                </CanRoute>
              }
            />
          </Route>

          <Route path="agency">
            <Route
              index
              element={
                <CanRoute permission={"agencyList"}>
                  <AgencyList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"agencyCreate"}>
                  <AgencyCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"agencyUpdate"}>
                  <AgencyUpdate />
                </CanRoute>
              }
            />
          </Route>

          <Route path="department">
            <Route
              index
              element={
                <CanRoute permission={"departmentList"}>
                  <DepartmentList />
                </CanRoute>
              }
            />

            <Route
              path="create"
              element={
                <CanRoute permission={"departmentCreate"}>
                  <DepartmentCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"departmentUpdate"}>
                  <DepartmentUpdate />
                </CanRoute>
              }
            />
          </Route>
          <Route path="position">
            <Route
              index
              element={
                <CanRoute permission={"positionList"}>
                  <PositionList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"positionCreate"}>
                  <PositionCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"positionUpdate"}>
                  <PositionUpdate />
                </CanRoute>
              }
            />
          </Route>

          <Route path="rate">
            <Route
              index
              element={
                <CanRoute permission={"rateList"}>
                  <RateList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"rateCreate"}>
                  <RateCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"rateUpdate"}>
                  <RateUpdate />
                </CanRoute>
              }
            />
          </Route>
          <Route path="topic">
            <Route
              index
              element={
                <CanRoute permission={"topicList"}>
                  <TopicList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"topicCreate"}>
                  <TopicCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"topicUpdate"}>
                  <TopicUpdate />
                </CanRoute>
              }
            />
          </Route>

          <Route path="devlanguage">
            <Route
              index
              element={
                <CanRoute permission={"languageList"}>
                  <DevLanguageList />
                </CanRoute>
              }
            />
            <Route
              path="create"
              element={
                <CanRoute permission={"languageCreate"}>
                  <DevLanguageCreate />
                </CanRoute>
              }
            />
            <Route
              path="update/:id"
              element={
                <CanRoute permission={"languageUpdate"}>
                  <DevLanguageUpdate />
                </CanRoute>
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
    </Routes>
  );
};
