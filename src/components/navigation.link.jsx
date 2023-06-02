import { NavLink } from "react-router-dom";

export const NavigationLink = ({ to, icon, children }) => {
  const activeLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--color-1)" : "var(--navbar-background)",
  });

  return (
    <NavLink style={activeLinkStyle} to={to}>
      <i className={"fa-solid " + icon}></i>
      <span>{children}</span>
    </NavLink>
  );
};
