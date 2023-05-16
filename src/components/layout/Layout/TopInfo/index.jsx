import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../store/AuthContext";
import { getUser } from "../../../../services/userService";

const TopInfo = () => {
  const [user, setUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation(); // test
  const { handleLogout } = useAuth();

  useEffect(() => {
    getUser()
      .then((res) => res.data)
      .then((data) => setUser(data));
  }, []);

  return (
    <div className={styles["topinfo"]}>
      <div className={styles["topinfo-path"]}>
        {location.pathname.slice(1).toLocaleUpperCase()}
      </div>
      <div className={styles["topinfo-userinfo"]}>
        <div>
          <div className={styles["userinfo-username"]}>{user.name}</div>
          <div className={styles["userinfo-role"]}>{user.role}</div>
        </div>
        <img
          className={styles["userinfo-avatar"]}
          src={user.avatar}
          alt="avatar"
          onClick={() => setShowDropdown((p) => !p)}
        />
        {showDropdown && (
          <ul className={styles["userinfo-dropdown"]}>
            <li>Profile</li>
            <li onClick={() => handleLogout()}>Logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopInfo;
