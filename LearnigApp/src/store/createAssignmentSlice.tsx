import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState= {
  data: null,
  screenOneData: [],
  screenTwoData : [],
  screenThreeData: [],
};

export const clearAll = createAction('CLEAR_ALL');

const createAssignmentSlice = createSlice({
  name: "createAssignment",
  initialState,
  reducers: {
    addAssignmentData: (state, action) => {
      state.data = action.payload;
    },
    clearAssignmentData: (state, action) => {
      state.data = null
    },
    addScreenOneData:  (state, action) => {
      state.screenOneData = action.payload;
    },
    addScreenTwoData:  (state, action) => {
      state.screenTwoData = action.payload;
    },
    addScreenThreeData:  (state, action) => {
      state.screenThreeData = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});
export const { addAssignmentData, clearAssignmentData, addScreenOneData, addScreenTwoData, addScreenThreeData } = createAssignmentSlice.actions;
export default createAssignmentSlice.reducer;