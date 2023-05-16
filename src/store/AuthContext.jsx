import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const isLogin = !token;

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.data.token);
      return response.data;
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
