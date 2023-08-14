import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import loginReducer from "./loginSlice";
import studentListReducer from "./StudentListSlice";
import dropdownSlice from "./dropdownSlice";
import logoutSlice from "./logoutSlice";
import createAssignmentSlice from "./createAssignmentSlice";
import { createLogger } from "redux-logger";
import createAssessmentSlice from "./createAssessmentSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    studentList: studentListReducer,
    courses: courseReducer,
    dropdown: dropdownSlice,
    logout: logoutSlice,
    createAssignment: createAssignmentSlice,
    assessmentData: createAssessmentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createLogger()),
});
