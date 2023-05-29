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
  CandidateUpdate,
  CandidateList,
  UserUpdate,

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
            <Route path=":id" element={<CandidateDetails />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<CDetails />} />
              <Route path="cv" element={<CCv />} />
              <Route path="stages" element={<CStages />} />
              <Route path="interviews" element={<CInterviews />} />
            </Route>
          </Route>

          <Route path="interviewer" element={<Employee />} />
          <Route path="interview" element={<CandidateList />} />
          <Route path="user" element={<UserList />} />
          {/* <Route path="position" element={<PositionList />} /> */}
          <Route path="setting" element={<Setting />} />
          <Route
            path="interview/candidate/create"
            element={<CandidateCreate />}
          />
          <Route path="interviewer/create" element={<InterviewerCreate />} />
          <Route path="candidate/create" element={<CandidateCreate />} />
          <Route
            path="candidate/interview/:id/:stageId"
            element={<InterviewCreate />}
          />
           <Route
            path="user/update/:id"
            element={<UserUpdate />}
          />

          <Route
            path="interview/assessment"
            element={<InterviewAssessment />}
          />
          <Route path="interviewer/user/create/:id" element={<UserCreate />} />
          <Route
            path="interviewer/update/:id"
            element={<InterviewerUpdate />}
          />

          <Route
            path="/candidate/interview-assessment/:candidateId/:interviewerId"
            element={<InterviewAssessment />}
          />
          <Route
            path="/candidate/interview-result/:candidateId/:stageId"
            element={<InterviewResult />}
          />
           <Route path="candidates/update/:id" element={<CandidateUpdate />} />

          <Route path="interviewer/user/create/:id" element={<UserCreate />} />

          <Route path="/user" element={<UserList />} />
           <Route path="/user/update/:id" element={<UserUpdate />} />

          <Route path="*" element={<NotFound />} />
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
