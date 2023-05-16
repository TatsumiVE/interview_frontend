import styles from "./style.module.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputPwd = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    handleLogin(email, password);

    navigate("/");
  };

  const handleShowPassword = () => {
    setShowPwd((prev) => !prev);
    let type = inputPwd.current.type;
    inputPwd.current.type = type == "text" ? "password" : "text";
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleFormSubmit}>
      <header className={styles["form-header"]}>Welcome back!</header>
      <p className={styles["form-desc"]}>
        Start managing your business faster and better
      </p>
      <label className={styles["form-input"]}>
        <input
          type="email"
          placeholder="username"
          name="email"
          className={styles["form-input__text"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className={"fa-solid fa-envelope " + styles["input-icon__left"]}></i>
      </label>
      <label className={styles["form-input"]}>
        <input
          type="password"
          name="password"
          placeholder="password"
          className={styles["form-input__pwd"]}
          ref={inputPwd}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className={"fa-solid fa-lock " + styles["input-icon__left"]}></i>
        <i
          className={`fa-regular fa-${showPwd ? "eye-slash " : "eye "}${
            styles["input-icon__right"]
          }`}
          onClick={() => handleShowPassword()}
        ></i>
      </label>
      <div className={styles["form-optional"]}>
        <label>
          <input type="checkbox" className={styles["form-input__check"]} /> Keep
          me login.
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" className={styles["btn-login"]}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
