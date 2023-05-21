import { LoginForm } from "./login.form";
import { LoginSlider } from "./login.slider";

export const Login = () => (
  <div className="login">
    <section className="login__left">
      <LoginSlider />
    </section>
    <section className="login__right">
      <LoginForm />
    </section>
  </div>
);
