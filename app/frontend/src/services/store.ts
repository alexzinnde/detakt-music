import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'

import demoReducer from './slices/demo.js'

const store = configureStore({
  reducer: {
    demoState: demoReducer
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 