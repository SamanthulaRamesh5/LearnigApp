import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";

const data = [
    {
      id: 1,
      assignmentType: CONSTANT.CREATE_ASSIGNMENT,
      icon: Images.CreateAssignment,
      navigateTo: NAVIGATION_CONSTANT.CREATE_ASSIGNMNET,
    },
    {
      id: 2,
      assignmentType: CONSTANT.VIEWASSIGNMENT,
      icon: Images.Ealpha,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_NEW_ASSIGNMENT,
    },
    {
      id: 3,
      assignmentType: CONSTANT.COMPLETEDASSIGNMENT,
      icon: Images.CompletedAssignment,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_COMPLETED_ASSIGNMENT,
    },
    {
      id: 4,
      assignmentType: CONSTANT.ASSIGNMENTREPORT,
      icon: Images.AssignmentReport,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_ASSIGNMENT_REPORT,
    },
    {
      id: 5,
      assignmentType: CONSTANT.PERFORMANCEEXPECTATION,
      icon: Images.PerformanceExpectation,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_PERFORMANCE_EXPECTATION,
    },
    
  ];
export default data