import { NavigationLink } from "./navigation.link";

export const MainNavigation = () => (
  <nav className="navbar">
    <NavigationLink to="/dashboard" icon="fa-table-columns">
      Dashboard
    </NavigationLink>
    <NavigationLink to="/candidates" icon="fa-user-group">
      Candidates
    </NavigationLink>
    <NavigationLink to="/interviewer" icon="fa-user-tie">
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
