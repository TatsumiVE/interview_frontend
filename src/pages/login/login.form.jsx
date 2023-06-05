import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../store/AuthContext";

export const LoginForm = () => {
  const { handleLogin } = useAuth();

  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const inputPwd = useRef();

 useEffect(() => {
    let timeoutId;

    if (message) {
      timeoutId = setTimeout(() => {
        setMessage("");
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;
    if (!email) {
      setEmailError("Please enter your email.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      isValid = false;
    }

    if (isValid) {
      try {
        await handleLogin(email, password);
        console.log("Login successful.");
      } catch (error) {
        const error_result = error.response.data.data.error;
        setMessage(`Login failed, ${error_result}.!`);
      }
    }
  };
  const handleShowPassword = () => {
    setShowPwd((prev) => !prev);
    let type = inputPwd.current.type;
    inputPwd.current.type = type == "text" ? "password" : "text";
  };
  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      <header className="form-header">Welcome from AcePlus !</header>
      <p className="form-desc">
        Start managing your business faster and better
      </p>

      {message && <span className="txt-danger txt-sm">{message}</span>} 

      <label className="form-input">
        <input
          type="email"
          placeholder="username"
          name="email"
          className="form-input__text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="fa-solid fa-envelope input-icon__left"></i>
      </label>
      {emailError && <span className="txt-danger txt-sm">{emailError}</span>}
      <label className="form-input">
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-input__pwd"
          ref={inputPwd}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="fa-solid fa-lock input-icon__left"></i>
        <i
          className={`fa-regular fa-${showPwd ? "eye-slash " : "eye "
            }${"input-icon__right"}`}
          onClick={() => handleShowPassword()}
        ></i>
      </label>
      {passwordError && <span className="txt-danger txt-sm">{passwordError}</span>}
      <div className="form-optional">
        <label>
          <input type="checkbox" className="form-input__check" /> Keep me login.
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" className="btn-login">
        Login
      </button>
    </form>
  );
};
