import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {DemoSubmissionFormData} from '../../components/forms/DemoSubmissionForm.js'

type DemoSliceState = {
  isLoading: boolean
  requestId: string
  error: any
}

export const submitDemoForm = createAsyncThunk('demoForm/submit', async (demoSubmission: DemoSubmissionFormData, thunk) => {
  try {
    const res = await axios.post('/api/v1/demo', demoSubmission)
    return res.data
  } catch (error) {
    console.error('ERROR submitDemoForm', error.message)
  }
})

const initialState: DemoSliceState = {
  isLoading: false,
  requestId: '',
  error: null
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
  }
})

export default demoSlice.reducer
export const {} = demoSlice.actions
