import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState= {
  data: [],
};

export const clearAll = createAction('CLEAR_ALL');

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    addDropdownValue: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});
export const { addDropdownValue } = dropdownSlice.actions;
export default dropdownSlice.reducer;
