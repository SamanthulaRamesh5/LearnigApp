import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Images from "../assests/images";
import CONSTANT from "../locales/constants";
import ParentAssignments from "../screens/ParentMenu/ParentAssignments";
import ParentAssessments from "../screens/ParentMenu/ParentAssessments";
import ParentReports from "../screens/ParentMenu/ParentReports";
import ParentAttendance from "../screens/ParentMenu/ParentAttendance";
import ParentTimetable from "../screens/ParentMenu/ParentTimetable";
import ParentUseEAlpha from "../screens/ParentMenu/ParentUseEAlpha";
import ParentDashboard from "../screens/ParentMenu/ParentDashboard";
import ParentMore from "../screens/ParentMenu/ParentMore";
import AssignmentList from "../screens/ParentMenu/ParentAssignments/AssignmentList";
import PerformanceExpectation from "../screens/ParentMenu/ParentAssignments/PerformanceExpectation";
import AssignmentDetails from "../screens/ParentMenu/ParentAssignments/AssignmentDetails";
import ParentAssignedAssignment from "../screens/ParentMenu/ParentAssignments/AssignedAssignments";
import CompletedAssignment from "../screens/ParentMenu/ParentAssignments/CompletedAssignment";
import AssignmentReport from "../screens/ParentMenu/ParentReports/AssignmentReport";
import AssignedAssessment from "../screens/ParentMenu/ParentAssessments/AssignedAssessment";
import CompletedAssessment from "../screens/ParentMenu/ParentAssessments/CompletedAssessment";
import AssessMentReport from "../screens/ParentMenu/ParentReports/AssessmentReport";
import AssessmentDetails from "../screens/ParentMenu/ParentAssessments/AssessMentDetails"
import WebView from "../screens/ParentMenu/WebView/ParentWebView"
import ParentFAQ from "../screens/ParentMenu/ParentMore/FAQs";

import NAVIGATION_CONSTANT from "../locales/constantsNavigation";
import ParentContactUs from "../screens/ParentMenu/ParentMore/ContactUs";
import UserProfile from "../component/app/UserProfile";

const Drawer = createDrawerNavigator();

export const parentDrawer = [
  {
    id: 1,
    title: CONSTANT.HOME,
    route: NAVIGATION_CONSTANT.PARENT_DASHBOARD,
    icon: Images.Vector,
  },
  {
    id: 2,
    title: CONSTANT.ASSESMENT,
    route: NAVIGATION_CONSTANT.ASSESMENT,
    icon: Images.Assesment,
  },
  {
    id: 3,
    title: CONSTANT.ASSIGNMENT,
    route: NAVIGATION_CONSTANT.ASSIGNMENT,
    icon: Images.Assignment,
  },
  {
    id: 4,
    title: CONSTANT.REPORT,
    route: NAVIGATION_CONSTANT.REPORT,
    icon: Images.Reports,
  },
  {
    id: 5,
    title: CONSTANT.ATTENDANCE,
    route: NAVIGATION_CONSTANT.ATTENDANCE,
    icon: Images.Attendance,
  },
  {
    id: 6,
    title: CONSTANT.TIMETABLE,
    route: NAVIGATION_CONSTANT.PARENTTIMETABLE,
    icon: Images.TimeTable,
  },
  {
    id: 7,
    title: CONSTANT.USEEALPHA,
    route: NAVIGATION_CONSTANT.PARENT_USE_EALPHA,
    icon: Images.Ealpha,
  },
  {
    id: 8,
    title: CONSTANT.MORE,
    route: NAVIGATION_CONSTANT.MORE,
    icon: Images.More,
  },
];

export const parentRoutes = () => {
  console.log("Parent module");
  return (
    <>
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PARENT_DASHBOARD}
        component={ParentDashboard}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSESMENT}
        component={ParentAssessments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNMENT}
        component={ParentAssignments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.REPORT}
        component={ParentReports}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ATTENDANCE}
        component={ParentAttendance}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.SCHOOLTIMETABLE}
        component={ParentTimetable}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PARENT_USE_EALPHA}
        component={ParentUseEAlpha}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.MORE}
        component={ParentMore}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNMENTLIST}
        component={AssignmentList}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PERFORANCEEXPECTATION}
        component={PerformanceExpectation}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNMENTDETAILS}
        component={AssignmentDetails}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNEDASSIGNMENTS}
        component={ParentAssignedAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.COMPLETEDASSIGNMENT}
        component={CompletedAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNMENTREPORT}
        component={AssignmentReport}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNED_ASSESSMENT}
        component={AssignedAssessment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.COMPLETED_ASSESSMENT}
        component={CompletedAssessment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PARENTTIMETABLE}
        component={ParentTimetable}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSESSMENT_REPORT}
        component={AssessMentReport}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSESSMENTDETAILS}
        component={AssessmentDetails}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PARENT_WEBVIEW}
        component={WebView}
      />
      <Drawer.Screen 
        name={NAVIGATION_CONSTANT.PARENT_FAQ} 
        component={ParentFAQ} 
      />
      <Drawer.Screen 
        name={NAVIGATION_CONSTANT.PARENT_CONTACT_US} 
        component={ParentContactUs} 
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.USER_PROFILE}
        component={UserProfile} />
    </>
  );
};
