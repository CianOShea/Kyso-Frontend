import { configureStore } from '@reduxjs/toolkit'
import reportReducer from './slices/reportSlices'

export default configureStore({
  reducer: {
    data: reportReducer
  }
})