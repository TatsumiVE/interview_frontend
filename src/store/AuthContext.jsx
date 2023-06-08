import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../components/loader";
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginRole, setLoginRole] = useState("");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/checkToken",
          {},
          {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          }
        );
        if (!response.data.valid) {
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

      setLoginEmail(response.data.data.email);
      setLoginName(response.data.data.name);
      setLoginRole(response.data.data.role);

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
        <Loader />
      ) : (
        <AuthContext.Provider
          value={{
            token,
            isLogin,
            user,
            handleLogin,
            handleLogout,
            can,
            loginName,
            loginRole,
          }}
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
// import axios from "axios";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import Loader from "../components/loader";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider = ({ children }) => {
//   const initialToken = localStorage.getItem("token");
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [token, setToken] = useState(initialToken);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/user", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(response.data.data);
//         setIsLogin(true);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };

//     if (token) {
//       fetchUser();
//     } else {
//       setIsLoading(false);
//     }
//   }, [token]);

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

//       localStorage.setItem("token", response.data.data.token);

//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");

//     setIsLogin(false);
//   };

//   const can = (permission) => {
//     return user?.permission?.includes(permission);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <AuthContext.Provider
//           value={{ token, isLogin, user, handleLogin, handleLogout, can }}
//         >
//           {children}
//         </AuthContext.Provider>
//       )}
//     </>
//   );
// };

// AuthContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
