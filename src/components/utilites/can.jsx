import { useAuth } from "../../store/AuthContext";

const Can = ({ permission, children }) => {
  const { user } = useAuth();
  if (user?.permission.includes(permission)) return children;
  else return;
};

export default Can;
