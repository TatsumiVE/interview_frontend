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

      <Can permission={"candidateView"}>
        <NavigationLink to="/candidates" icon="fa-user-group">
          Candidate
        </NavigationLink>
      </Can>
      <Can permission={"interviewerView"}>
        <NavigationLink to="/interviewer" icon="fa-user-tie">
          Interviewer
        </NavigationLink>
      </Can>

      <Can permission={"interviewView"}>
        <NavigationLink to="/interview" icon="fa-calendar-days">
          Interview
        </NavigationLink>
      </Can>

      <Can permission={"userView"}>
        <NavigationLink to="/user" icon=" fa-user-plus">
          User
        </NavigationLink>
      </Can>

      <Can permission={"agencyView"}>
        <NavigationLink to="/agency" icon="fa-solid fa-circle-nodes">
          Agency
        </NavigationLink>
      </Can>

      <Can permission={"departmentView"}>
        <NavigationLink to="/department" icon="fa-building">
          Department
        </NavigationLink>
      </Can>

      <Can permission={"positionView"}>
        <NavigationLink to="/position" icon="fa-layer-group">
          Position
        </NavigationLink>
      </Can>

      <Can permission={"languageView"}>
        <NavigationLink to="/devlanguage" icon="fa-language">
          Language
        </NavigationLink>
      </Can>
      <Can permission={"rateView"}>
        <NavigationLink to="/rate" icon="fa-square-poll-vertical">
          Rate
        </NavigationLink>
      </Can>
      <Can permission={"topicView"}>
        <NavigationLink to="/topic" icon="fa-file-lines">
          Topic
        </NavigationLink>
      </Can>
    </nav>
  );
};
