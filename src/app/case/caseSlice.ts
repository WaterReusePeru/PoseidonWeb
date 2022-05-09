import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { treatmentTrains, ValueWaterQuality } from '../data/model'

type CaseState = {
  step: number
  completedSteps: [number, number, number, number]
  commInfo: {
    countryID: number
    currency: number //0 is USD, 1 is local currency
  }
  input: {
    custom: boolean
    category: number
    qualityClass?: number
    customValues: ValueWaterQuality
    customValueEntered: boolean
    quantity?: number
  }
  endUse: {
    category: number
    qualityClass?: number
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
    outputValues?: ValueWaterQuality
    annualizedOMCost: number
    annualizedOpex: number
    costPerCubic: number
    values: ValueWaterQuality
  }[]
}

const initialState: CaseState = {
  step: 0,
  completedSteps: [0, 0, 0, 0],
  commInfo: { countryID: 0, currency: 1 }, //Peru is the defaul country with local currency
  input: {
    custom: false,
    category: 28, //Peru is the default category
    customValues: {
      id: 100,
      turbidity: NaN,
      tss: NaN,
      bod: NaN,
      cod: NaN,
      tn: NaN,
      tp: NaN,
      fc: NaN,
      tc: NaN,
      tds: NaN,
      nitrate: NaN,
      toc: NaN,
      virus: NaN,
      helminths: NaN,
    },
    customValueEntered: false,
  },
  endUse: { category: 29 },
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
    annualizedOpex: undefined,
    costPerCubic: undefined,
    values: {
      id: 100,
      turbidity: NaN,
      tss: NaN,
      bod: NaN,
      cod: NaN,
      fc: NaN,
      tc: NaN,
    },
  }),
}

export const caseSlice = createSlice({
  name: 'case',
  initialState: initialState,
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
    setCustomInput: (state, action) => {
      state.input.custom = action.payload
    },
    setCustomInputValues: (state, action) => {
      state.input.customValues = action.payload
      state.input.customValueEntered = true
      if (state.input.quantity) {
        state.completedSteps[1] = 1
      }
    },
    setInputQualityCategory: (state, action) => {
      state.input.category = action.payload
      state.input.qualityClass = undefined
      state.completedSteps[1] = 0
    },
    setInputQualityClass: (state, action) => {
      state.input.qualityClass = action.payload
      if (state.input.quantity) {
        state.completedSteps[1] = 1
      }
    },
    setInputQuantity: (state, action) => {
      state.input.quantity = action.payload
      if (!action.payload) {
        state.completedSteps[1] = 0
      }
      if (action.payload && (state.input.qualityClass || state.input.customValueEntered)) state.completedSteps[1] = 1
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
        state.solutions[index].annualizedOpex = treatment.annualizedOpex
        state.solutions[index].costPerCubic = treatment.costPerCubic
        state.solutions[index].values.turbidity = treatment.turbidity
        state.solutions[index].values.tss = treatment.tss
        state.solutions[index].values.bod = treatment.bod
        state.solutions[index].values.cod = treatment.cod
        state.solutions[index].values.fc = treatment.fc
        state.solutions[index].values.tc = treatment.tc
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
  setInputQuantity,
  setCustomInput,
  setCustomInputValues,
  setEndUseQualityCategory,
  setEndUseQualityClass,
  resetSolutions,
  setSolutionNoneNeeded,
  setSolutionNoneAvailable,
  setSolutionCount,
  setSolutions,
  setSolutionsortByRating,
} = caseSlice.actions

export const selectCase = (state: RootState) => state.case

export default caseSlice.reducer
