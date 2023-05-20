import { NavigationLink } from "./navigation.link";

export const MainNavigation = () => (
  <nav className="navbar">
    <NavigationLink to="/dashboard" icon="fa-table-columns">
      Dashboard
    </NavigationLink>
    <NavigationLink to="/candidate" icon="fa-user-group">
      Candidate
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
<<<<<<< HEAD
=======
    <NavigationLink to="/candidate/create" icon="fa-gear">
      Candidate Create
    </NavigationLink>
    <NavigationLink to="/interview/result" icon="fa-gear">
      Interview Result
    </NavigationLink>
>>>>>>> f310356d534cb6008f04830223fb54f1e8a08330
  </nav>
);
