import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Images from "../assests/images";
import CONSTANT from "../locales/constants";
import TeacherDashboard from "../screens/TeacherMenu/TeacherDashboard";
import Assessments from "../screens/TeacherMenu/Assessments";
import Reports from "../screens/TeacherMenu/Reports";
import Attendance from "../screens/TeacherMenu/Attendance";
import TeacherUseEAlpha from "../screens/TeacherMenu/TeacherUseEAlpha";

import Courses from "../screens/TeacherMenu/MyCourses";
import TeacherMore from "../screens/TeacherMenu/More";
import SchoolTimeTable from "../screens/TeacherMenu/SchoolTimetable";
import Assignments from "../screens/TeacherMenu/Assignments";
import CreateAsessmentTeacher from "../screens/TeacherMenu/Assessments/CreateAssessment";
import CreateAssessmentAssignTeacher from "../screens/TeacherMenu/Assessments/CreateAssessment/CreateAssessmentAssign";
import ViewAsessmentTeacher from "../screens/TeacherMenu/Assessments/ViewAssessment/index";
import PerformanceExpectationTeacher from "../screens/TeacherMenu/Reports/Performance";
import Gradebook from "../screens/TeacherMenu/Reports/GradeBook/Gradebook";
import CompletedAssignmentTeacher from "../screens/TeacherMenu/Assignments/CompletedAssignmentTeacher";
import ViewAssignmentTeacher from "../screens/TeacherMenu/Assignments/ViewAssignmentTeacher";
import TeacherAssignmentDetails from "../screens/TeacherMenu/Assignments/ViewAssignmentTeacher/AssignmentDetails";
import SubmittedAssignment from "../screens/TeacherMenu/Assignments/ViewAssignmentTeacher/SubmittedAssignment";
import CompletedAssessmentTeacher from "../screens/TeacherMenu/Assessments/CompletedAssessment";
import CompletedAssessmentDetail from "../screens/TeacherMenu/Assessments/CompletedAssessment/CompletedAssessmentDetail";
import ComponentList from "../screens/TeacherMenu/MyCourses/ComponentList";
import CreateAssignment from "../screens/TeacherMenu/TeacherAssignments/CreateAssignment/CreateAssignment";
import CreateAssignmnetSectionOne from "../screens/TeacherMenu/TeacherAssignments/CreateAssignment/CreateAssignmnetSectionOne/CreateAssignmnetSectionOne";
import CreateAssignmnetSectionTwo from "../screens/TeacherMenu/TeacherAssignments/CreateAssignment/CreateAssignmnetSectionTwo/CreateAssignmnetSectionTwo";
import CreateAssignmnetSectionThree from "../screens/TeacherMenu/TeacherAssignments/CreateAssignment/CreateAssignmnetSectionThree/CreateAssignmnetSectionThree";
import TeacherFAQ from "../screens/TeacherMenu/More/FAQs";
import TeacherContactUs from "../screens/TeacherMenu/More/ContactUs";
import TeacherIFrame from "../screens/TeacherMenu/IFrame";
import TeacherIFrameURL from "../screens/TeacherMenu/IFrame/IFrameURL";
import CompletedAssignmentDetailsTeacher from "../screens/TeacherMenu/Assignments/CompletedAssignmentTeacher/CompletedAssignmentDetailsTeacher";
import TableofContents from "../screens/TeacherMenu/MyCourses/TableofContents";
import PrintAssessment from "../screens/TeacherMenu/Assessments/PrintAssessment";
import QuestionAssessmetIFrame from "../screens/TeacherMenu/Assessments/PrintAssessment/QuestionSheet";
import AnswerAssessmentIFrame from "../screens/TeacherMenu/Assessments/PrintAssessment/AnswerSheet";
import TeacherAssignmentReport from "../screens/TeacherMenu/Reports/AssignmentReport";
import TeacherAssignmentReportAssignments from "../screens/TeacherMenu/Reports/AssignmentReport/AssignmentScreen";
import NAVIGATION_CONSTANT from "../locales/constantsNavigation";
import UserProfile from "../component/app/UserProfile";

const Drawer = createDrawerNavigator();

export const teacherDrawer = [
  {
    id: 1,
    title: CONSTANT.HOME,
    route: NAVIGATION_CONSTANT.TEACHER_DASHBOARD,
    icon: Images.Vector,
  },
  {
    id: 2,
    title: CONSTANT.COURSES,
    route: NAVIGATION_CONSTANT.COURSES,
    icon: Images.Book,
  },
  {
    id: 3,
    title: CONSTANT.ASSIGNMENT,
    route: NAVIGATION_CONSTANT.ASSIGNMENT,
    icon: Images.Assignment,
  },
  {
    id: 4,
    title: CONSTANT.ASSESMENT,
    route: NAVIGATION_CONSTANT.ASSESMENT,
    icon: Images.Assesment,
  },
  {
    id: 5,
    title: CONSTANT.REPORT,
    route: NAVIGATION_CONSTANT.REPORT,
    icon: Images.Reports,
  },
  {
    id: 6,
    title: CONSTANT.ATTENDANCE,
    route: NAVIGATION_CONSTANT.ATTENDANCE,
    icon: Images.Attendance,
  },
  {
    id: 7,
    title: CONSTANT.SCHOOLTIMETABLE,
    route: NAVIGATION_CONSTANT.SCHOOLTIMETABLE,
    icon: Images.TimeTable,
  },
  {
    id: 8,
    title: CONSTANT.USEEALPHA,
    route: NAVIGATION_CONSTANT.TEACHER_USE_EALPHA,
    icon: Images.Ealpha,
  },
  {
    id: 9,
    title: CONSTANT.MORE,
    route: NAVIGATION_CONSTANT.TEACHER_MORE,
    icon: Images.More,
  },
];

export const teacherRoutes = () => {
  console.log("Teacher module");
  return (
    <>
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_DASHBOARD}
        component={TeacherDashboard}
      />
      <Drawer.Screen name={NAVIGATION_CONSTANT.COURSES} component={Courses} />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSIGNMENT}
        component={Assignments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ASSESMENT}
        component={Assessments}
      />
      <Drawer.Screen name={NAVIGATION_CONSTANT.REPORT} component={Reports} />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ATTENDANCE}
        component={Attendance}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.SCHOOLTIMETABLE}
        component={SchoolTimeTable}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_USE_EALPHA}
        component={TeacherUseEAlpha}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_MORE}
        component={TeacherMore}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_PERFORMANCE_EXPECTATION}
        component={PerformanceExpectationTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.COMPONENT}
        component={ComponentList}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.Courses_Table_Of_Contents}
        component={TableofContents}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_CREATE_ASSESSMENT}
        component={CreateAsessmentTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_CREATE_ASSESSMENT_ASSIGN}
        component={CreateAssessmentAssignTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_VIEW_ASSESSMENT}
        component={ViewAsessmentTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSESSMENT}
        component={CompletedAssessmentTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSESSMENT_DETAIL}
        component={CompletedAssessmentDetail}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.GRADE_BOOK}
        component={Gradebook}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_REPORT}
        component={TeacherAssignmentReport}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_REPORT_ASSIGNMENTS}
        component={TeacherAssignmentReportAssignments}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.COMPLETED_ASSIGNMENT_TEACHER}
        component={CompletedAssignmentTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSIGNMENT_DETAILS}
        component={CompletedAssignmentDetailsTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.VIEW_ASSIGNMENT_TEACHER}
        component={ViewAssignmentTeacher}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.SUBMITTED_ASSIGNMENT}
        component={SubmittedAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_DETAILS}
        component={TeacherAssignmentDetails}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.CREATE_ASSIGNMNET}
        component={CreateAssignment}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.CREATE_ASSIGNMENT_ONE}
        component={CreateAssignmnetSectionOne}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.CREATE_ASSIGNMENT_TWO}
        component={CreateAssignmnetSectionTwo}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.CREATE_ASSIGNMENT_THREE}
        component={CreateAssignmnetSectionThree}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_FAQ}
        component={TeacherFAQ}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_CONTACT_US}
        component={TeacherContactUs}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_IFRAME}
        component={TeacherIFrame}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.TEACHER_IFRAME_URL}
        component={TeacherIFrameURL}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.PRINTASSESSMENT}
        component={PrintAssessment}
      />

      <Drawer.Screen
        name={NAVIGATION_CONSTANT.QUESTIONSHEETASSESSMENT}
        component={QuestionAssessmetIFrame}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.ANSWERSHEETASSESMENT}
        component={AnswerAssessmentIFrame}
      />
      <Drawer.Screen
        name={NAVIGATION_CONSTANT.USER_PROFILE}
        component={UserProfile} />
    </>
  );
};
