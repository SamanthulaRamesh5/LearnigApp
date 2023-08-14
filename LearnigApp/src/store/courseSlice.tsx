import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import endurl from "../app/endurl";
import { getAPIRequest } from "../app/apiController";

export const getCourseList = createAsyncThunk(
  "getCourseData",
  async (data:any ,{ rejectWithValue }) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result:any = await getAPIRequest('http://43.241.63.135:8000/api/v1/course-code-service/courses/assigned_courses/14/details/', config.headers)
      //(`${endurl.COURSES}1783/details/`, config);
      console.log(result.data.response)
      return result;
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
  courseDataForIFrame: {course_id: "", lessonData: {}},
  lessonDataURL: [],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourseId: (state:any, action) => {
      state.courseDataForIFrame.course_id = action.payload
    },
    setLessonData: (state:any, action) => {
      state.courseDataForIFrame.lessonData = action.payload;
    },
    setLessonDataURL: (state:any, action) => {
      state.lessonDataURL = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCourseList.fulfilled, (state:any, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getCourseList.rejected, (state:any, action) => {
      state.loading = false;
      state.data = [];
      state.err = action.payload;
    });
    builder.addCase(clearAll, () => initialState);
  },
});

export const { setCourseId, setLessonData, setLessonDataURL } = courseSlice.actions

export default courseSlice.reducer;
