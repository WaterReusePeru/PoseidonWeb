import waterQualitiesJSON from './waterQualities.json'
import waterQualityCategoriesJSON from './waterQualityCategories.json'
import waterQualityFactorsJSON from './waterQualityFactors.json'
import unitProcessesJSON from './unitProcesses.json'
import treatmentTrainsJSON from './treatmentTrains.json'
import communityInfosJSON from './communityInfo.json'
import evaluationCriteriaJSON from './evaluationCriteria.json'

export interface CommunityInfo {
  id: number
  name: string
  nameEs: string
  currency: string
  exchangeToUSD: number
  landCost: number
  electricityCost: number
  personalCost: number
  discountRate: number
}

export const communityInfos: ReadonlyArray<CommunityInfo> = communityInfosJSON as ReadonlyArray<CommunityInfo>

export interface UnitProcess {
  id: number
  name: string
  nameEs: string
  turbidity: number
  tss: number
  bod: number
  cod: number
  fc: number
  tc: number
  construction_cost_b: number
  construction_cost_c: number
  land_requirements_b: number
  land_requirements_c: number
  energy_requirements_b: number
  energy_requirements_c: number
  labor_requirements_b: number
  labor_requirements_c: number
  other_om_b: number
  other_om_c: number
  recovery: number
  reliability: number
  ease_to_upgrade: number
  adaptability_to_varying_flow: number
  adaptability_to_varying_quality: number
  ease_of_om: number
  ease_of_construction: number
  ease_of_demonstration: number
  power_demand: number
  chemical_demand: number
  odor_generation: number
  impact_on_ground_water: number
  land_requirements: number
  cost_of_treatment: number
  waste: number
  useful_life: number
}

export const unitProcesses: Array<UnitProcess> = unitProcessesJSON as Array<UnitProcess>

export interface TreatmentTrain {
  id: number
  title: string
  titleEs: string
  category: string
  categoryEs: string
  description: string
  descriptionEs: string
  case_study: string
  case_studyEs: string
  unit_processes?: number[] | null
}

export const treatmentTrains: Array<TreatmentTrain> = treatmentTrainsJSON as Array<TreatmentTrain>

export interface WaterQualityCategory {
  id: number
  name: string
  nameEs: string
  input: boolean
}

export const waterQualityCategories: Array<WaterQualityCategory> =
  waterQualityCategoriesJSON as Array<WaterQualityCategory>

export interface PresetWaterQuality {
  id: number
  name: string
  nameEs: string
  category: number
  turbidity: number
  tss: number
  bod: number
  cod: number
  tn: number
  tp: number
  fc: number
  tc: number
  tds: number
  nitrate: number
  toc: number
  virus: number
  helminths: number
  note: string
  noteEs: string
  reference: string
  referenceEs: string
}

export interface CustomWaterQuality {
  name: string
  turbidity?: number
  tss?: number
  bod?: number
  cod?: number
  tn?: number
  tp?: number
  fc?: number
  tc?: number
  tds?: number
  nitrate?: number
  toc?: number
  virus?: number
  helminths?: number
}

export type WaterQuality = PresetWaterQuality // | CustomWaterQuality

function NaNifier(value: any) {
  if (value === null) {
    return NaN
  }
  return value
}

const waterQualitiesJSONNaNified = NaNifier(waterQualitiesJSON)

export const waterQualities: ReadonlyArray<WaterQuality> = waterQualitiesJSONNaNified as ReadonlyArray<WaterQuality>

export interface WaterQualityFactor {
  id: number
  name: string
  nameShort: string
  nameShortEs: string
  nameLong: string
  nameLongEs: string
  unit: string
  maxValue: number
}

export const waterQualityFactors: ReadonlyArray<WaterQualityFactor> =
  waterQualityFactorsJSON as ReadonlyArray<WaterQualityFactor>

export interface EvaluationCriterion {
  name: string
  nameLong: string
  nameLongEs: string
}

export const evaluationCriteria: ReadonlyArray<EvaluationCriterion> =
  evaluationCriteriaJSON as ReadonlyArray<EvaluationCriterion>

export interface OutputQuality {
  id: number
  treatmentTrain: number
  turbidity: number
  tss: number
  bod: number
  cod: number
  fc: number
  tc: number
  constructionCost: number
  landRequirements: number
  annualizedLandCost: number
  energyRequirements: number
  annualizedEnergyCost: number
  laborRequirements: number
  annualizedLaborCost: number
  otherOM: number
  annualizedOMCost: number
  capex: number
  annualizedCapex: number
  capexPerCubic: number
  rating: number
}

export type QualityFactor = 'turbidity' | 'tss' | 'bod' | 'cod' | 'fc' | 'tc'
