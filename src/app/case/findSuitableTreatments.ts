import { CommunityInfo, UnitProcess, unitProcesses } from '../data/model'
import { treatmentTrains } from '../data/model'
import { WaterQuality } from '../data/model'
import { OutputQuality } from '../data/model'
import { evaluationCriteria } from '../data/model'
import { QualityFactor } from '../data/model'

interface CostFactors {
  [key: string]: number
  construction_cost: number
  land_requirements: number
  energy_requirements: number
  labor_requirements: number
  other_om: number
}

export function findSuitableTreatments(
  input: WaterQuality,
  endUse: WaterQuality,
  treatmentFactors: QualityFactor[],
  amount: number,
  commInfo: CommunityInfo
) {
  let outputQualities: OutputQuality[] = []

  treatmentTrains.forEach((treatmentTrain, index) => {
    let suitableTreatmentTrain = true
    const outputQualityPerFactor: { [x: string]: number } = {} //TODO: Type
    let outputCostPerFactor: CostFactors = {
      construction_cost: 0,
      land_requirements: 0,
      energy_requirements: 0,
      labor_requirements: 0,
      other_om: 0,
    }

    let rating = 0

    treatmentFactors.forEach((treatmentFactor) => {
      const TfKey = treatmentFactor as keyof WaterQuality
      const UpKey = treatmentFactor as keyof UnitProcess
      let outputQualityStep = Number(input[TfKey])

      treatmentTrain.unit_processes!.forEach((unitProcess) => {
        //TODO: !
        outputQualityStep = outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][UpKey])) / 100
      })

      outputQualityPerFactor[TfKey] = outputQualityStep

      if (outputQualityPerFactor[treatmentFactor] > Number(endUse[TfKey])) {
        suitableTreatmentTrain = false
      }
    })

    let annualizedCapex = 0
    let annualizedLandCost = 0
    let annualizedEnergyCost = 0
    let annualizedLaborCost = 0
    let annualizedOMCost = 0

    treatmentTrain.unit_processes!.forEach((unitProcess) => {
      //TODO: !
      evaluationCriteria.forEach((criteria) => {
        const UpKey = criteria.name as keyof UnitProcess
        rating = rating + Number(unitProcesses[unitProcess][UpKey])
      })

      if (amount !== null) {
        Object.keys(outputCostPerFactor).forEach((costFactor: keyof CostFactors) => {
          //TODO
          const UpKeyB = (costFactor + '_b') as keyof UnitProcess
          const UpKeyC = (costFactor + '_c') as keyof UnitProcess
          let outputCostStep = 0
          outputCostStep =
            outputCostStep +
            Number(unitProcesses[unitProcess][UpKeyC]) * Number(amount) ** Number(unitProcesses[unitProcess][UpKeyB])

          outputCostPerFactor[costFactor] = outputCostPerFactor[costFactor] + outputCostStep

          if (costFactor === 'construction_cost') {
            annualizedCapex += (outputCostStep * 1.39 * 1.27) / unitProcesses[unitProcess]['useful_life']
          }

          if (costFactor === 'land_requirements') {
            annualizedLandCost += (outputCostStep * commInfo.landCost) / unitProcesses[unitProcess]['useful_life']
          }

          if (costFactor === 'energy_requirements') {
            annualizedEnergyCost +=
              (outputCostStep * commInfo.electricityCost) / unitProcesses[unitProcess]['useful_life']
          }

          if (costFactor === 'labor_requirements') {
            annualizedLaborCost += (outputCostStep * commInfo.personalCost) / unitProcesses[unitProcess]['useful_life']
          }

          if (costFactor === 'other_om') {
            annualizedOMCost += (outputCostStep * commInfo.personalCost) / unitProcesses[unitProcess]['useful_life']
          }
        })
      }
    })

    if (suitableTreatmentTrain && outputQualityPerFactor! && outputCostPerFactor!) {
      //TODO: !
      outputQualities.push({
        id: index,
        treatmentTrain: treatmentTrain.id,
        turbidity: outputQualityPerFactor['turbidity'],
        tss: outputQualityPerFactor['tss'],
        bod: outputQualityPerFactor['bod'],
        cod: outputQualityPerFactor['cod'],
        fc: outputQualityPerFactor['fc'],
        tc: outputQualityPerFactor['tc'],

        constructionCost: outputCostPerFactor['construction_cost'],
        capex: outputCostPerFactor['construction_cost'] * 1.39 * 1.27,
        annualizedCapex: annualizedCapex,
        capexPerCubic: annualizedCapex / (amount * 365),

        landRequirements: outputCostPerFactor['land_requirements'],
        annualizedLandCost: annualizedLandCost,

        energyRequirements: outputCostPerFactor['energy_requirements'],
        annualizedEnergyCost: annualizedEnergyCost,

        laborRequirements: outputCostPerFactor['labor_requirements'],
        annualizedLaborCost: annualizedLaborCost,

        otherOM: outputCostPerFactor['other_om'],
        annualizedOMCost: annualizedOMCost,

        annualizedOpex: annualizedLandCost + annualizedEnergyCost + annualizedLaborCost + annualizedOMCost,

        costPerCubic:
          (annualizedCapex + annualizedLandCost + annualizedEnergyCost + annualizedLaborCost + annualizedOMCost) /
          (amount * 365),

        rating: rating / treatmentTrain.unit_processes!.length / evaluationCriteria.length, //TODO: !
      })
    }
  })

  return outputQualities!
}
