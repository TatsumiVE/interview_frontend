import { NavigationLink } from "./navigation.link";

export const MainNavigation = () => (
  <nav className="navbar">
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
    <NavigationLink to="/candidate/create" icon="fa-gear">
      Candidate Create
    </NavigationLink>
  </nav>
);
