import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import endurl from "../app/endurl";

export const getLoginData = createAsyncThunk(
  "getLoginData",
  async (data:any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response:any = await axios.post(endurl.LOGIN, data, config);

      return response;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearAll = createAction('CLEAR_ALL');

const initialState = {
  loading: false,
  data: [],
  err: "",
  isAuthenticated: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {  updateLoginData: (state, action) => {
    const { AccessToken, IdToken, ExpiresIn } = action.payload;

    state.data.AccessToken = AccessToken;
    state.data.IdToken = IdToken;
    state.data.ExpiresIn = ExpiresIn;
  },
},
  extraReducers: (builder) => {
    builder.addCase(getLoginData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLoginData.fulfilled, (state:any, action) => {
      state.loading = false;
      state.data = {...action.payload.data.response.data, status: action.payload.data.response.status };
      state.err = "";
      state.isAuthenticated = true
    });
    builder.addCase(getLoginData.rejected, (state:any, action) => {
      state.loading = false;
      state.data = [];
      state.err = action.payload;
      state.isAuthenticated = false
    });
    builder.addCase(clearAll, () => initialState);
  },
});

export const {updateLoginData}  = loginSlice.actions

export default loginSlice.reducer;
