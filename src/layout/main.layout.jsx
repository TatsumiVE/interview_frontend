import { Outlet } from "react-router-dom";
import { MainNavigation, Title, TopInfo } from "../components";

export const Layout = () => (
  <div className="container">
    <section className="container-section__left">
      <Title />
      <MainNavigation />
    </section>
    <section className="container-section__right">
      <TopInfo />
      <main className="main">
        <Outlet />
      </main>
    </section>
  </div>
);
