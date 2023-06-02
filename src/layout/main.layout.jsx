import { Outlet } from "react-router-dom";
import { MainNavigation, Title, TopInfo } from "../components";

export const Layout = () => (
  <div className="container">
    <div className="nav">
      <Title />
      <MainNavigation />
    </div>
    <div className="header">
      <TopInfo />
    </div>
    <div className="main">
      <Outlet />
    </div>
  </div>
);
