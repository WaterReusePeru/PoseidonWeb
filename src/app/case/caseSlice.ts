import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { treatmentTrains } from '../data/model'

type CaseState = {
  step: number
  completedSteps: [number, number, number, number]
  commInfo: {
    countryID: number
    currency: number //0 is USD, 1 is local currency
  }
  inputQuality: {
    category: number
    qualityClass?: number
  }
  endUse: {
    category: number
    qualityClass?: number
  }
  quantity: {
    amount?: number
    distance?: number
    heightDifference?: number
  }
  solution: {
    noneNeeded: boolean
    count: number
    noneAvailable: boolean
    sortByRating: boolean
  }
  solutions: {
    treatmentTrain?: number
    rating?: number
    capex?: number
    annualizedCapex?: number
    capexPerCubic?: number
    landRequirements?: number
    annualizedLandCost?: number
    energyRequirements?: number
    annualizedEnergyCost?: number
    laborRequirements?: number
    annualizedLaborCost?: number
    otherOM?: number
    annualizedOMCost: number
  }[]
}

const initialState: CaseState = {
  step: 0,
  completedSteps: [0, 0, 0, 0],
  commInfo: { countryID: 0, currency: 1 }, //Peru is the defaul country with local currency
  inputQuality: { category: 28 }, //Peru is the default category
  endUse: { category: 29 },
  quantity: {},
  solution: {
    noneNeeded: true,
    noneAvailable: false,
    sortByRating: false,
    count: 0,
  },
  solutions: Array(treatmentTrains.length).fill({
    treatmentTrain: undefined,
    rating: undefined,
    capex: undefined,
    annualizedCapex: undefined,
    capexPerCubic: undefined,
  }),
}

export const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    next: (state) => {
      state.step += 1
    },
    previous: (state) => {
      state.step -= 1
    },
    reset: (state) => {
      state.step = 0
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCountry: (state, action) => {
      state.commInfo.countryID = action.payload
      state.commInfo.currency = 0
      state.completedSteps[0] = 0
    },
    setCurrency: (state, action) => {
      action.payload === 1000 ? (state.commInfo.currency = 0) : (state.commInfo.currency = 1)
      state.completedSteps[0] = 0
    },
    setInputQualityCategory: (state, action) => {
      state.inputQuality.category = action.payload
      state.inputQuality.qualityClass = undefined
      state.completedSteps[1] = 0
    },
    setInputQualityClass: (state, action) => {
      state.inputQuality.qualityClass = action.payload
      state.completedSteps[1] = 1
    },
    setEndUseQualityCategory: (state, action) => {
      state.endUse.category = action.payload
      state.endUse.qualityClass = undefined
      state.completedSteps[2] = 0
    },
    setEndUseQualityClass: (state, action) => {
      state.endUse.qualityClass = action.payload
      state.completedSteps[2] = 2
    },
    setQuantity: (state, action) => {
      state.quantity.amount = action.payload
      if (action.payload === null) {
        state.completedSteps[3] = 0
      }
      if (action.payload !== null && state.quantity.distance !== null) {
        state.completedSteps[3] = 3
      }
    },
    setDistance: (state, action) => {
      state.quantity.distance = action.payload
      if (action.payload === null) {
        state.completedSteps[3] = 0
      }
      if (action.payload !== null && state.quantity.amount !== null) {
        state.completedSteps[3] = 3
      }
    },
    setHeightDifference: (state, action) => {
      state.quantity.heightDifference = action.payload
    },
    setSolutionNoneNeeded: (state, action) => {
      state.solution.noneNeeded = action.payload
    },
    resetSolutions: (state) => {
      state.solution.noneNeeded = false
      state.solution.noneAvailable = false
    },
    setSolutionNoneAvailable: (state, action) => {
      state.solution.noneAvailable = action.payload
    },
    setSolutionCount: (state, action) => {
      state.solution.count = action.payload
    },
    setSolutions: (state, action) => {
      action.payload.forEach((treatment: any, index: any) => {
        console.log(action.payload)
        state.solutions[index].treatmentTrain = treatment.treatmentTrain
        state.solutions[index].rating = treatment.rating
        state.solutions[index].capex = treatment.capex
        state.solutions[index].annualizedCapex = treatment.annualizedCapex
        state.solutions[index].capexPerCubic = treatment.capexPerCubic
        state.solutions[index].landRequirements = treatment.landRequirements
        state.solutions[index].annualizedLandCost = treatment.annualizedLandCost
        state.solutions[index].energyRequirements = treatment.energyRequirements
        state.solutions[index].annualizedEnergyCost = treatment.annualizedEnergyCost
        state.solutions[index].laborRequirements = treatment.laborRequirements
        state.solutions[index].annualizedLaborCost = treatment.annualizedLaborCost
        state.solutions[index].otherOM = treatment.otherOM
        state.solutions[index].annualizedOMCost = treatment.annualizedOMCost
      })
    },
    setSolutionsortByRating: (state, action) => {
      state.solution.sortByRating = action.payload
    },
  },
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
  setHeightDifference,
  resetSolutions,
  setSolutionNoneNeeded,
  setSolutionNoneAvailable,
  setSolutionCount,
  setSolutions,
  setSolutionsortByRating,
} = caseSlice.actions

export const selectCase = (state: RootState) => state.case

export default caseSlice.reducer
