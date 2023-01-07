import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {DemoSubmissionFormData} from '../../components/forms/DemoSubmissionForm.js'
import {Demo} from '@prisma/client'

type DemoSliceState = {
  isLoading: boolean
  requestId: string
  error: any
  demos: Demo[]
}

export const submitDemoForm = createAsyncThunk('demoForm/submit', async (demoSubmission: DemoSubmissionFormData, thunk) => {
  try {
    const res = await axios.post('/api/v1/demo', demoSubmission)
    return res.data
  } catch (error) {
    console.error('ERROR submitDemoForm', error.message)
  }
})

export const getAllDemos = createAsyncThunk('demos/getAllDemos', async (_, thunk) => {
  try {
    const res = await axios.get('/api/v1/demo')
    return res.data
  } catch (error) {
    console.error('ERROR submitDemoForm', error.message)
  }
})

const initialState: DemoSliceState = {
  isLoading: false,
  requestId: '',
  error: null,
  demos: []
}

const demoSlice = createSlice<DemoSliceState, {}>({
  name: 'demoSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(submitDemoForm.pending, (state, action) => {
        state.isLoading = true
        state.requestId = action.meta.requestId
      })
      .addCase(submitDemoForm.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(submitDemoForm.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(getAllDemos.pending, (state, action) => {
        state.isLoading = true
        state.requestId = action.meta.requestId
      })
      .addCase(getAllDemos.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(getAllDemos.fulfilled, (state, action) => {
        state.isLoading = false
        state.demos = action.payload.demos
      })
  }
})

export default demoSlice.reducer
export const {} = demoSlice.actions
