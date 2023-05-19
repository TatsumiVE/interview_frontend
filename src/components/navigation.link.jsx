import { NavLink } from "react-router-dom";

export const NavigationLink = ({ to, icon, children }) => {
  const handleLinkActive = ({ isActive }) => ({
    backgroundColor: isActive ? "rgb(23, 122, 254)" : "rgb(28, 33, 45)",
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
