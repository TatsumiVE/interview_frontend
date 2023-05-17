import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [initial, setInitial] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [token, setToken] = useState(initial);

  const isLogin = !!token;

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );
      setToken(response.data.data.token);
      console.log("token done");
      localStorage.setItem("token", response.data.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, isLogin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
