import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import {
  Dashboard,
  Candidate,
  Employee,
  Setting,
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
            <Route path="update" element={<InterviewerUpdate />} />
          </Route>
          <Route path="interview">
            <Route index element={<InterviewList />} />
            <Route path="create" element={<InterviewCreate />} />
            <Route path="assessment" element={<InterviewAssessment />} />
            <Route path="result" element={<InterviewResult />} />
          </Route>
          <Route path="*" element={<NotFound />} />

          <Route path="candidate/create" element={<CandidateCreate />} />

          <Route path="candidate/update/:id" element={<CandidateUpdate />} />

          <Route
            path="interview/assessment"
            element={<InterviewAssessment />}
          />
          <Route path="interviewer/user/create/:id" element={<UserCreate />} />

          <Route path="interviewer/user/create/:id" element={<UserCreate />} />
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
