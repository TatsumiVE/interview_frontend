import { NavLink } from "react-router-dom";

export const NavigationLink = ({ to, icon, children }) => {
  const handleLinkActive = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--color-1)" : "var(--color-4)",
  });

  return (
    <NavLink style={handleLinkActive} to={to}>
      <span>
        <i className={"fa-solid " + icon}></i>
        {children}
      </span>
    </NavLink>
  );
};
