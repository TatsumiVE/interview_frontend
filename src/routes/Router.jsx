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
  CandidateList,
  UserUpdate,
  UserList,
  
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
          <Route path="candidates" element={<Candidate />} />
          <Route path="interviewer" element={<Employee />} />
          <Route path="interview" element={<CandidateList />} />
          <Route path="user" element={<UserList />} />
          {/* <Route path="position" element={<PositionList />} /> */}
          <Route path="setting" element={<Setting />} />
          <Route
            path="interview/candidate/create"
            element={<CandidateCreate />}
          />
          <Route path="candidates/:id" element={<CandidateDetails />} />
          <Route path="interviewer/create" element={<InterviewerCreate />} />
          <Route path="candidate/create" element={<CandidateCreate />} />
          <Route path="candidate/interview/:id" element={<InterviewCreate />} />
          <Route path="interview/result" element={<InterviewResult />} />
          <Route path="interview/assessment" element={<InterviewAssessment/>}/>
          <Route path="interviewer/user/create/:id" element={<UserCreate/>}/>
          <Route path="interviewer/update/:id" element={<InterviewerUpdate/>}/>
          <Route path="user/update/:id" element={<UserUpdate/>}/>
          <Route
            path="/candidate/interview-assessment/:candidateId/:interviewerId"
            element={<InterviewAssessment />}
          />

          <Route path="interviewer/user/create/:id" element={<UserCreate />} />

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
