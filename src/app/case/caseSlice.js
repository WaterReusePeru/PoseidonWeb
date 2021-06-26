import { createSlice } from '@reduxjs/toolkit'

export const caseSlice = createSlice({
  name: 'case',
  initialState: {
    step: 0,
    completedSteps: [null, null, null, null],
    commInfo: {
      countryID: null,
      currency: null //0 is USD, 1 is local currency
    },
    inputQQ: {
      category: null,
      qualityClass: null,
      quantity: null
    },
    endUse: {
      category: null,
      qualityClass: null
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
      state.commInfo.currency = null
      state.completedSteps[0] = null
    },
    setCurrency: (state, action) => {
      action.payload === 1000 ? (state.commInfo.currency = 0) : (state.commInfo.currency = 1)
      state.completedSteps[0] = 0
    },
    setInputQualityCategory: (state, action) => {
      state.inputQQ.category = action.payload
      state.inputQQ.qualityClass = null
      state.completedSteps[1] = null
    },
    setInputQualityClass: (state, action) => {
      state.inputQQ.qualityClass = action.payload
      if (state.inputQQ.quantity !== null) {
        state.completedSteps[1] = 1
      }
    },
    setInputQuantity: (state, action) => {
      state.inputQQ.quantity = action.payload
      if (action.payload === null) {
        state.completedSteps[1] = null
      }
      if (state.inputQQ.qualityClass !== null && action.payload !== null) {
        state.completedSteps[1] = 1
      }
    },
    setEndUseQualityCategory: (state, action) => {
      state.endUse.category = action.payload
      state.endUse.qualityClass = null
      state.completedSteps[1] = null
    },
    setEndUseQualityClass: (state, action) => {
      state.endUse.qualityClass = action.payload
      state.completedSteps[2] = 2
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  next,
  previous,
  reset,
  setCountry,
  setCurrency,
  setInputQualityCategory,
  setInputQualityClass,
  setInputQuantity,
  setEndUseQualityCategory,
  setEndUseQualityClass
} = caseSlice.actions

export default caseSlice.reducer
