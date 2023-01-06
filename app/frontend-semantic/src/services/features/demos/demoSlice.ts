import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import demoApi from './demoApi'

import { Demo } from '@prisma/client'
import axios from 'axios'


// Define a type for the slice state
interface DemoState {
  isLoading: boolean
  requestId: string
  demos: Demo[]
  selected?: Demo
  error?: any
}

// Define the initial state using that type
const initialState: DemoState = {
  demos: [],
  selected: undefined,
  isLoading: false,
  requestId: ''
}

export const getAllDemos = createAsyncThunk('demo/getAllDemos', async (_, thunkApi) => {
  try {
    const { data } = await axios.get('/api/demo')
    return data
  } catch (error) {
    console.error('ERROR getAllDemos', error)
  }
})

export const counterSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    selectDemo: (state, action) => {
      state.selected = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDemos.pending, (state, action) => {
        state.isLoading = true
        state.requestId = action.meta.requestId
      })
      .addCase(getAllDemos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getAllDemos.fulfilled, (state, action) => {
        state.isLoading = false
        state.demos = action.payload.demos
      })
  },
})

export const { } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer