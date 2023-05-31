// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider = ({ children }) => {
//   const initialToken = localStorage.getItem("token");
//   const initialUser = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();
//   const [token, setToken] = useState(initialToken);
//   const [user, setUser] = useState(initialUser);

//   const isLogin = !!token;

//   const handleLogin = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       setToken(response.data.data.token);
//       setUser(response.data.data);
//       const { permission, role } = response.data.data;
//       console.log(permission);
//       localStorage.setItem("token", response.data.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.data));

//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   const can = (permission) => {
//     return user?.permission?.includes(permission);
//   };

//   return (
//     <>
//       <AuthContext.Provider
//         value={{ token, isLogin, user, handleLogin, handleLogout, can }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };
// AuthContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/checkToken",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.valid, "valid");
        if (!response.data.valid) {
          console.log("invalid");
          handleLogout();
        } else {
          setIsLogin(true);
          setToken(token);
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      checkTokenValidity();
      console.log("here check");
    } else {
      setIsLoading(false);
    }
  }, [token, isLogin]);

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
      const { permission, role } = response.data.data;
      console.log(permission);
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
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  const can = (permission) => {
    return user?.permission?.includes(permission);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AuthContext.Provider
          value={{ token, isLogin, user, handleLogin, handleLogout, can }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
