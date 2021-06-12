import { createSlice } from '@reduxjs/toolkit'

export const caseSlice = createSlice({
  name: 'case',
  initialState: {
    step: 0,
    commInfo: {
      countryID: null,
      currency: null //0 is USD, 1 is local currency
    },
    inputQQ: {
      category: '',
      waterQualityClass: '',
      quantity: '',
      averageAmount: null
    }
  },
  reducers: {
    next: state => {
      state.step += 1
    },
    previous: state => {
      state.step -= 1
    },
    reset: state => {
      state.step = 0
    },
    setCountry: (state, action) => {
      state.commInfo.countryID = action.payload
    },
    setCurrency: (state, action) => {
      action.payload === 1000 ? (state.commInfo.currency = 0) : (state.commInfo.currency = 1)
    }
  }
})

// Action creators are generated for each case reducer function
export const { next, previous, reset, setCountry, setCurrency } = caseSlice.actions

export default caseSlice.reducer
