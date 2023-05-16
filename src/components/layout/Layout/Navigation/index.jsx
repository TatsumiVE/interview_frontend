import styles from "./style.module.scss";
import NavigationLink from "../../../link/NavigationLink";

const MainNavigation = () => (
  <nav className={styles.navbar}>
    <NavigationLink to="/dashboard" icon="fa-table-columns">
      Dashboard
    </NavigationLink>
    <NavigationLink to="/candidate" icon="fa-user-group">
      Candidate
    </NavigationLink>
    <NavigationLink to="/employee" icon="fa-user-tie">
      Employee
    </NavigationLink>
    <NavigationLink to="/interview" icon="fa-calendar-days">
      Interview
    </NavigationLink>
    <NavigationLink to="/setting" icon="fa-gear">
      Setting
    </NavigationLink>
  </nav>
);

export default MainNavigation;
