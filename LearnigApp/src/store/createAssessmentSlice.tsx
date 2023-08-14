import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const clearAll = createAction("CLEAR_ALL");

const assessmentSlice = createSlice({
  name: "assessmentData",
  initialState,
  reducers: {
    addAssessmentData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});
export const { addAssessmentData } = assessmentSlice.actions;
export default assessmentSlice.reducer;
