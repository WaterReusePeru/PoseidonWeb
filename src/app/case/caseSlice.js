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
    inputQuality: {
      category: null,
      qualityClass: null
    },
    endUse: {
      category: null,
      qualityClass: null
    },
    quantity: {
      amount: null,
      distance: null,
      heightDifference: null
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
    setStep: (state, action) => {
      state.step = action.payload
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
      state.inputQuality.category = action.payload
      state.inputQuality.qualityClass = null
      state.completedSteps[1] = null
    },
    setInputQualityClass: (state, action) => {
      state.inputQuality.qualityClass = action.payload
      state.completedSteps[1] = 1
    },
    setEndUseQualityCategory: (state, action) => {
      state.endUse.category = action.payload
      state.endUse.qualityClass = null
      state.completedSteps[2] = null
    },
    setEndUseQualityClass: (state, action) => {
      state.endUse.qualityClass = action.payload
      state.completedSteps[2] = 2
    },
    setQuantity: (state, action) => {
      state.quantity.amount = action.payload
      if (action.payload === null) {
        state.completedSteps[3] = null
      }
      if (action.payload !== null && state.quantity.distance !== null) {
        state.completedSteps[3] = 3
      }
    },
    setDistance: (state, action) => {
      state.quantity.distance = action.payload
      if (action.payload === null) {
        state.completedSteps[3] = null
      }
      if (action.payload !== null && state.quantity.quantity !== null) {
        state.completedSteps[3] = 3
      }
    },
    setHeightDifference: (state, action) => {
      state.quantity.heightDifference = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  next,
  previous,
  reset,
  setStep,
  setCountry,
  setCurrency,
  setInputQualityCategory,
  setInputQualityClass,
  setEndUseQualityCategory,
  setEndUseQualityClass,
  setQuantity,
  setDistance,
  setHeightDifference
} = caseSlice.actions

export default caseSlice.reducer
