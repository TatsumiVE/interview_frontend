import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Login from "../pages/Login";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Candidate from "../pages/Candidates";
import Employee from "../pages/Employees";
import Interview from "../pages/Interviews";
import Setting from "../pages/Setting";
import Not from "../pages/Not";
import CandidateCreate from "../components/candidate";

const Router = () => {
  const { isLogin } = useAuth();

  return (
    <Routes>
      {isLogin ? (
        <Route path="/*" element={<Layout />}>
          {console.log("layout")}
          <Route path="" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidate" element={<Candidate />} />
          <Route path="employee" element={<Employee />} />
          <Route path="interview" element={<Interview />} />
          <Route path="setting" element={<Setting />} />
          <Route path="candidate/create" element={<CandidateCreate />} />

          <Route path="*" element={<Not />} />
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
