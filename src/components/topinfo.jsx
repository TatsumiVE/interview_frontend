import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { getUser } from "../services/userService";

export const TopInfo = () => {
  const [user, setUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { token, handleLogout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(token);
        setUser(response.data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchUser();
  }, [token]);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <>
      <div className="topinfo-path">
        {location.pathname.slice(1).toUpperCase()}
      </div>
      <div className="topinfo-userinfo">
        <div>
          <div className="userinfo-username">{user.name}</div>
          <div className="userinfo-role">{user.role}</div>
        </div>
        <img
          className="userinfo-avatar"
          src={user.avatar}
          alt="avatar"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <ul className="userinfo-dropdown">
            <li>Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
};
