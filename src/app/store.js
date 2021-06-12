import { configureStore } from '@reduxjs/toolkit'
import caseReducer from './case/caseSlice'

export default configureStore({
  reducer: {
    case: caseReducer
  }
})
