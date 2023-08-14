import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import endurl from '../app/endurl'

export const getStudentList = createAsyncThunk(
  'getStudentData',
  async (parentId:any ,{ rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response: any = await axios.get(endurl.STUDENTDETAIL+parentId, config)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const clearAll = createAction('CLEAR_ALL');

const initialState = {
  loading: false,
  data: [],
  err: '',
}

export const StudentListSlice = createSlice({
  name: 'studentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentList.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getStudentList.fulfilled, (state: any, action) => {
      state.loading = false
      state.data = action.payload.data?.response?.students
      state.err = ''
    });
    builder.addCase(getStudentList.rejected, (state: any, action) => {
      state.loading = false
      state.data = []
      state.err = action.payload
    });
    builder.addCase(clearAll, () => initialState);
  },
})

export default StudentListSlice.reducer
