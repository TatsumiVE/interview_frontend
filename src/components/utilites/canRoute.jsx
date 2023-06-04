import { useEffect, useState } from "react";
import { NotFound } from "../../pages";
import { useAuth } from "../../store/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
const CanRoute = ({ permission, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user?.permission.includes(permission))
      navigate("/notfound", { state: { location }, replace: true });
  });
  if (user?.permission.includes(permission)) return children;
};

export default CanRoute;
