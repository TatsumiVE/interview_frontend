import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";
import MainNavigation from "./Navigation";
import Title from "./Navbar";
import TopInfo from "./TopInfo";

const Layout = () => (
  <div className={styles["container"]}>
    <section className={styles["container-section__left"]}>
      <Title />
      <MainNavigation />
    </section>
    <section className={styles["container-section__right"]}>
      <TopInfo />
      <main className={styles["main"]}>
        <Outlet />
      </main>
    </section>
  </div>
);

export default Layout;
