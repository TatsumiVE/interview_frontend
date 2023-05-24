import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

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
      setUser(response.data.data);

      console.log("token done");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <>
      <AuthContext.Provider
        value={{ token, isLogin, user, handleLogin, handleLogout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
