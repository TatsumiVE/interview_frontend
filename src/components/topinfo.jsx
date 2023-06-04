import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { getUser } from "../services/userService";
import avatarImage from "../assets/image/user-profile1.jpg";

export const TopInfo = () => {
  const [user, setUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { token, handleLogout, loginName, loginRole } = useAuth();

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
        <h1>Interview Management System</h1>
      </div>
      <div className="topinfo-userinfo">
        <div>
          {/* <div className="userinfo-username">{user.name}</div>
          <div className="userinfo-role">{user.role}</div> */}
          <div className="userinfo-username">{loginName}</div>
          <div className="userinfo-role">{loginRole}</div>
        </div>
        <img
          className="userinfo-avatar"
          src={avatarImage}
          alt="avatar"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <ul className="userinfo-dropdown">
            {/* <li>Profile</li> */}
            <li onClick={handleLogout}>Log out <span><i class="fa-solid fa-arrow-right-from-bracket"></i></span></li>
          </ul>
        )}
      </div>
    </>
  );
};
