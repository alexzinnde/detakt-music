import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import demoApi from './demoApi'

import { Demo } from '@prisma/client'
import axios from 'axios'


// Define a type for the slice state
interface DemoState {
  demos: Demo[]
  selected?: Demo
}

// Define the initial state using that type
const initialState: DemoState = {
  demos: [],
  selected: undefined,

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
        console.log('action payload', action.payload)
      })
      .addCase(getAllDemos.rejected, (state, action) => {
        console.log('action payload', action.payload)
      })
      .addCase(getAllDemos.fulfilled, (state, action) => {
        console.log('action payload', action.payload)
      })
  },
})

export const { } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer