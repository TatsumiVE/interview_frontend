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
    Interviewer
    </NavigationLink>
    <NavigationLink to="/user" icon="fa-user-group">
      User
    </NavigationLink>
    <NavigationLink to="/user" icon="fa-table-columns">
      Position
    </NavigationLink>
    {/* <NavigationLink to="/user" icon="fa-user-group">
      Department
    </NavigationLink>
    <NavigationLink to="/user" icon="fa-table-columns">
      Language
    </NavigationLink> */}
    <NavigationLink to="/interview" icon="fa-calendar-days">
      Interview
    </NavigationLink>
    <NavigationLink to="/setting" icon="fa-gear">
      Setting
    </NavigationLink>
    
  </nav>
);
