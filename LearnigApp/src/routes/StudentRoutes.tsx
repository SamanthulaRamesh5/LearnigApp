import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Images from "../assests/images";
import CONSTANT from "../locales/constants";

import StudentDashboard from "../screens/StudentMenu/StudentDashboard";
import StudentCourses from "../screens/StudentMenu/StudentMyCourses";
import StudentAssignments from "../screens/StudentMenu/StudentAssignments";
import StudentAssessments from "../screens/StudentMenu/StudentAssessments";
import StudentReports from "../screens/StudentMenu/StudentReports";
import StudentAttendance from "../screens/StudentMenu/StudentAttendance";
import StudentTimetable from "../screens/StudentMenu/StudentTimetable";
import StudentUseEAlpha from "../screens/StudentMenu/StudentUseEAlpha";
import More from "../screens/StudentMenu/More";

import StudentCourseDetail from "../screens/StudentMenu/StudentMyCourses/CourseDetail";
import StudentNewAssignment from "../screens/StudentMenu/StudentAssignments/NewAssignment";
import StudentCompletedAssignment from "../screens/StudentMenu/StudentAssignments/Completed";
import StudentViewedAsessment from "../screens/StudentMenu/StudentAssessments/Viewed";
import StudentCompletedAsessment from "../screens/StudentMenu/StudentAssessments/Completed";
import StudentAssessmentReport from "../screens/StudentMenu/StudentReports/AssessmentReport";
import StudentAssignmentReport from "../screens/StudentMenu/StudentReports/AssignmentReport";
import StudentPerformanceExpectation from "../screens/StudentMenu/StudentReports/Performance";
import SchoolTimeTable from "../screens/TeacherMenu/SchoolTimetable"
import StudentAssignmentDetails from "../screens/StudentMenu/StudentAssignments/AssignmentDetails";
import StudentAssessmentDetails from "../screens/StudentMenu/StudentAssessments/AssessmentDetails";
import StudentWebview from "../screens/StudentMenu/WebView/StudentWebview";
import AssessmentReportStudent from "../screens/StudentMenu/StudentAssessments/AssessmentQuickReport";
import StudentFAQ from "../screens/StudentMenu/More/FAQs";
import NAVIGATION_CONSTANT from "../locales/constantsNavigation";
import CreateAssignment from "../screens/TeacherMenu/TeacherAssignments/CreateAssignment/CreateAssignment";
import StudentContactUs from "../screens/StudentMenu/More/ContactUs";
import StudentComponentList from "../screens/StudentMenu/StudentMyCourses/StudentComponentList";
import StudentTableofContents from "../screens/StudentMenu/StudentMyCourses/StudentTableofContents";
import UserProfile from "../component/app/UserProfile";
import StudentIFrame from "../screens/StudentMenu/StudentIFrame";

const Drawer = createDrawerNavigator();

export const studentDrawer = [
    {
        id: 1,
        title: CONSTANT.HOME,
        route: NAVIGATION_CONSTANT.STUDENT_DASHBOARD,
        icon: Images.Vector
    },
    {
        id: 2,
        title: CONSTANT.COURSES,
        route: NAVIGATION_CONSTANT.STUDENT_COURSES,
        icon: Images.Book
    },
    {
      id: 3,
      title: CONSTANT.ASSIGNMENT,
      route: NAVIGATION_CONSTANT.STUDENT_ASSIGNMENTS,
      icon: Images.Assignment
    },
    {
      id: 4,
      title: CONSTANT.ASSESMENT,
      route: NAVIGATION_CONSTANT.STUDENT_ASSESSMENTS,
      icon: Images.Assesment
    },
    {
      id: 5,
      title: CONSTANT.REPORT,
      route: NAVIGATION_CONSTANT.STUDENT_REPORTS,
      icon: Images.Reports
    },
    {
      id: 6,
      title: CONSTANT.ATTENDANCE,
      route: NAVIGATION_CONSTANT.STUDENT_ATTENDENCE,
      icon: Images.Attendance
    },
    {
      id: 7,
      title: CONSTANT.SCHOOLTIMETABLE,
      route: NAVIGATION_CONSTANT.STUDENT_TIMETABLE,
      icon: Images.TimeTable
    },
    {
      id: 8,
      title: CONSTANT.USEEALPHA,
      route: NAVIGATION_CONSTANT.STUDENT_USE_EALPHA,
      icon: Images.Ealpha
    },
    {
      id: 9,
      title: CONSTANT.MORE,
      route: NAVIGATION_CONSTANT.MORE,
      icon: Images.More
    },
]

export const studentRoutes = () => {
    console.log("Student module")
    return (
      <>
      {/* STUDENT MODULE */}
        <Drawer.Screen
          name={NAVIGATION_CONSTANT.STUDENT_DASHBOARD}
          component={StudentDashboard}
        />
        <Drawer.Screen
          name={NAVIGATION_CONSTANT.STUDENT_USE_EALPHA}
          component={StudentUseEAlpha}
        />
        <Drawer.Screen
          name={NAVIGATION_CONSTANT.MORE}
          component={More}
        />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COURSES}
        component={StudentCourses}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COMPONENET_LIST}
        component={StudentComponentList}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COURCES_TABLE_OF_CONTENTS}
        component={StudentTableofContents}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COURSEDETAIL}
        component={StudentCourseDetail}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSIGNMENTS}
        component={StudentAssignments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_NEW_ASSIGNMENT}
        component={StudentNewAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COMPLETED_ASSIGNMENT}
        component={StudentCompletedAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSIGNMENT_DETAILS}
        component={StudentAssignmentDetails}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSESSMENTS}
        component={StudentAssessments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_VIEWED_ASSESSMENT}
        component={StudentViewedAsessment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_COMPLETED_ASSESSMENT}
        component={StudentCompletedAsessment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSESSMENT_DETAILS}
        component={StudentAssessmentDetails}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_WEBVIEW}
        component={StudentWebview}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_REPORTS}
        component={StudentReports}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSESSMENT_REPORT}
        component={StudentAssessmentReport}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ASSIGNMENT_REPORT}
        component={StudentAssignmentReport}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_PERFORMANCE_EXPECTATION}
        component={StudentPerformanceExpectation}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.SCHOOLTIMETABLE}
        component={SchoolTimeTable}
      />      
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.QUICK_VIEW_REPORT_ASSESSMENT}
        component={AssessmentReportStudent}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_ATTENDENCE}
        component={StudentAttendance}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_TIMETABLE}
        component={StudentTimetable}
      />
      <Drawer.Screen 
        name={NAVIGATION_CONSTANT.STUDENT_FAQ} 
        component={StudentFAQ} />

      <Drawer.Screen 
      name={NAVIGATION_CONSTANT.STUDENT_CONTACT_US} 
      component={StudentContactUs} />
       <Drawer.Screen
        name={NAVIGATION_CONSTANT.STUDENT_IFRAME}
        component={StudentIFrame} />

      <Drawer.Screen
        name={NAVIGATION_CONSTANT.USER_PROFILE}
        component={UserProfile} />

      </>
    );
  };
