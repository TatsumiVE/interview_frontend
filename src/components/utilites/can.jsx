import { useAuth } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
const Can = ({ permission, children }) => {
  const { user } = useAuth();

  if (user?.permission.includes(permission)) return children;
};

export default Can;
