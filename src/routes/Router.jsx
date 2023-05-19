import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import {
  Dashboard,
  Candidate,
  Employee,
  InterviewList,
  Setting,
  NotFound,
  Login,
  CandidateCreate,
} from "../pages";
import { Layout } from "../layout";
const Router = () => {
  const { isLogin } = useAuth();

  return (
    <Routes>
      {isLogin ? (
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidate" element={<Candidate />} />
          <Route path="employee" element={<Employee />} />
          <Route path="interview" element={<InterviewList />} />
          <Route path="setting" element={<Setting />} />
          <Route path="candidate/create" element={<CandidateCreate />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route path="/*">
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
