import { useAuth } from "../store/AuthContext";
import { NavigationLink } from "./navigation.link";

export const MainNavigation = () => {
  const { can } = useAuth();

  return (
    <nav className="navbar">
      {can("dashboardView") && (
        <NavigationLink to="/dashboard" icon="fa-table-columns">
          Dashboard
        </NavigationLink>
      )}
      {can("candidateList") && (
        <NavigationLink to="/candidates" icon="fa-user-group">
          Candidates
        </NavigationLink>
      )}
      {can("interviewerList") && (
        <NavigationLink to="/interviewer" icon="fa-user-tie">
          Interviewer
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/interview" icon="fa-calendar-days">
          Interview
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/user" icon="fa-user-tie">
          User
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/agency" icon="fa-user-tie">
          Agency
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/department" icon="fa-user-tie">
          Department
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/position" icon="fa-user-tie">
          Position
        </NavigationLink>
      )}
      {can("interviewProcessCreate") && (
        <NavigationLink to="/devlanguage" icon="fa-user-tie">
          Language
        </NavigationLink>
      )}
      {can("settingView") && (
        <NavigationLink to="/setting" icon="fa-gear">
          Setting
        </NavigationLink>
      )}


    </nav>
  );
};
