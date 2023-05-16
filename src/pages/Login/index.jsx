import styles from "./style.module.scss";
import LoginForm from "./LoginForm";
import LoginSlider from "./LoginSlider";

const Login = () => (
  <div className={styles["login"]}>
    <section className={styles["login__left"]}>
      <LoginSlider />
    </section>
    <section className={styles["login__right"]}>
      <LoginForm />
    </section>
  </div>
);

export default Login;
