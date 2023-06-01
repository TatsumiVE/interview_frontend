import { NavigationLink } from "./navigation.link";
import Can from "../components/utilites/can";
export const MainNavigation = () => {
  return (
    <nav className="navbar">
      <Can permission={"dashboardView"}>
        <NavigationLink to="/dashboard" icon="fa-table-columns">
          Dashboard
        </NavigationLink>
      </Can>

      <Can permission={"candidateList"}>
        <NavigationLink to="/candidates" icon="fa-user-group">
          Candidates
        </NavigationLink>
      </Can>
      <Can permission={"interviewerList"}>
        <NavigationLink to="/interviewer" icon="fa-user-tie">
          Interviewer
        </NavigationLink>
      </Can>

      <Can permission={"interviewList"}>
        <NavigationLink to="/interview" icon="fa-calendar-days">
          Interview
        </NavigationLink>
      </Can>

      <Can permission={"userList"}>
        <NavigationLink to="/user" icon=" fa-user-plus">
          User
        </NavigationLink>
      </Can>

      <Can permission={"agencyList"}>
        <NavigationLink to="/agency" icon="fa-solid fa-circle-nodes">
          Agency
        </NavigationLink>
      </Can>

      <Can permission={"departmentList"}>
        <NavigationLink to="/department" icon="fa-building">
          Department
        </NavigationLink>
      </Can>

      <Can permission={"positionList"}>
        <NavigationLink to="/position" icon="fa-layer-group">
          Position
        </NavigationLink>
      </Can>

      <Can permission={"languageList"}>
        <NavigationLink to="/devlanguage" icon="fa-language">
          Language
        </NavigationLink>
      </Can>
      <Can permission={"rateList"}>
        <NavigationLink to="/rate" icon="fa-percent">
          Rate
        </NavigationLink>
      </Can>
      <Can permission={"topicList"}>
        <NavigationLink to="/topic" icon="fa-biohazard">
          Topic
        </NavigationLink>
      </Can>

      <NavigationLink to="/setting" icon="fa-gear">
        Setting
      </NavigationLink>
    </nav>
  );
};
