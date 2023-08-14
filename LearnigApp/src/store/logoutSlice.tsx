import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import endurl from "../app/endurl";

export const logout = createAsyncThunk(
  "logout",
  async (data:any, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${data}`,
        },
      };
      const response:any = await axios.post(endurl.LOGOUT, null , config);

      return response;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearAll = createAction('CLEAR_ALL');

const initialState = {
  loading: false,
  err: "",
}

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state:any, action) => {
      state.loading = false;
      state.err = "";
    });
    builder.addCase(logout.rejected, (state:any, action) => {
      state.loading = false;
      state.err = action.payload;
    });
    builder.addCase(clearAll, () => initialState);
  },
});

export default logoutSlice.reducer;
