import waterQualitiesJSON from '../data/waterQualities.json'
import waterQualityCategoriesJSON from '../data/waterQualityCategories.json'
import waterQualityFactorsJSON from '../data/waterQualityFactors.json'
import unitProcessesJSON from '../data/unitProcesses.json'
import treatmentTrainsJSON from '../data/treatmentTrains.json'
import communityInfosJSON from '../data/communityInfo.json'
import evaluationCriteriaJSON from '../data/evaluationCriteria.json'

export interface communityInfo {
    id: number;
    name: string;
    nameEs: string;
    currency: string;
    exchangeToUSD: number;
    landCost: number;
    electricityCost: number;
    personalCost: number;
    discountRate: number;
}

export const communityInfos: ReadonlyArray<communityInfo> = communityInfosJSON as ReadonlyArray<communityInfo>

export interface UnitProcess {
    id: number;
    name: string;
    nameEs: string;
    turbidity: string;
    tss: string;
    bod: string;
    cod: string;
    fc: string;
    tc: string;
    construction_cost_b: string;
    construction_cost_c: string;
    land_requirements_b: string;
    land_requirements_c: string;
    energy_requirements_b: string;
    energy_requirements_c: string;
    labor_requirements_b: string;
    labor_requirements_c: string;
    other_om_b: string;
    other_om_c: string;
    recovery: string;
    reliability: string;
    ease_to_upgrade: string;
    adaptability_to_varying_flow: string;
    adaptability_to_varying_quality: string;
    ease_of_om: string;
    ease_of_construction: string;
    ease_of_demonstration: string;
    power_demand: string;
    chemical_demand: string;
    odor_generation: string;
    impact_on_ground_water: string;
    land_requirements: string;
    cost_of_treatment: string;
    waste: string;
    useful_life: string;
}

export const unitProcesses: Array<UnitProcess> = unitProcessesJSON as Array<UnitProcess>

export interface TreatmentTrain {
    id: number;
    title: string;
    titleEs: string;
    category: string;
    categoryEs: string;
    description: string;
    descriptionEs: string;
    case_study: string;
    case_studyEs: string;
    unit_processes?: (number)[] | null;
}

export const treatmentTrains: Array<TreatmentTrain> = treatmentTrainsJSON as Array<TreatmentTrain>

export interface WaterQualityCategory {
    id: number;
    name: string;
    nameEs: string;
    input: boolean;
}

export const waterQualityCategories: Array<WaterQualityCategory> = waterQualityCategoriesJSON as Array<WaterQualityCategory>

export interface WaterQuality {
    id: number;
    name: string;
    nameEs: string;
    category: number;
    turbidity: string;
    tss: string;
    bod: string;
    cod: string;
    tn: string;
    tp: string;
    fc: string;
    tc: string;
    tds: string;
    nitrate: string;
    toc: string;
    virus: string;
    helminths: string;
    note: string;
    noteEs: string;
    reference: string;
    referenceEs: string;
}

export const waterQualities: ReadonlyArray<WaterQuality> = waterQualitiesJSON as ReadonlyArray<WaterQuality>

export interface WaterQualityFactor {
    name: string;
    nameLong: string;
    nameLongEs: string;
    unit: string;
}

export const waterQualityFactors: ReadonlyArray<WaterQualityFactor> = waterQualityFactorsJSON as ReadonlyArray<WaterQualityFactor>

export interface EvaluationCriterion {
    name: string;
    nameLong: string;
    nameLongEs: string;
}

export const evaluationCriteria: ReadonlyArray<EvaluationCriterion> = evaluationCriteriaJSON as ReadonlyArray<EvaluationCriterion>