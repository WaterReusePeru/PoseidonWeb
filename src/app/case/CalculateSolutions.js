import { useDispatch } from 'react-redux'
import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import unitProcesses from '../data/unitProcesses'
import treatmentTrains from '../data/treatmentTrains'

export default function CalculateSolutions(comm, input, enduse, amount, byCost) {
  const dispatch = useDispatch()

  const qualityFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  const costFactors = [
    'construction_cost',
    'land_requirements',
    'energy_requirements',
    'labor_requirements',
    'other_om'
  ]

  let treatmentFactors = []

  qualityFactors.forEach(qualityFactor => {
    if ((Number(input[qualityFactor]) > Number(enduse[qualityFactor])) & (Number(enduse[qualityFactor]) !== -1)) {
      //Check here if -1 and don't push?
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(qualityFactor)
    }
  })

  const evaluationCriteria = [
    'reliability',
    'ease_to_upgrade',
    'adaptability_to_varying_flow',
    'adaptability_to_varying_quality',
    'ease_of_om',
    'ease_of_construction',
    'ease_of_demonstration',
    'power_demand',
    'chemical_demand',
    'odor_generation',
    'impact_on_ground_water',
    'land_requirements',
    'cost_of_treatment',
    'waste'
  ]

  function findSuitableTreatments(input, endUse, TreatmentFactors) {
    let outputQualities = []

    treatmentTrains.forEach((treatmentTrain, index) => {
      let suitableTreatmentTrain = true
      let outputQualityPerFactor = []
      let outputCostPerFactor = []
      let rating = 0

      TreatmentFactors.forEach((treatmentFactor, index) => {
        let outputQualityStep = Number(input[treatmentFactor])

        treatmentTrain.unit_processes.forEach(unitProcess => {
          outputQualityStep =
            outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][treatmentFactor])) / 100
        })

        outputQualityPerFactor[treatmentFactor] = outputQualityStep

        if (outputQualityPerFactor[treatmentFactor] > Number(endUse[treatmentFactor])) {
          suitableTreatmentTrain = false
        }
      })

      costFactors.forEach(costFactor => {
        outputCostPerFactor[costFactor] = 0
      })

      let annualizedCapex = 0

      treatmentTrain.unit_processes.forEach(unitProcess => {
        evaluationCriteria.forEach(criteria => {
          rating = rating + Number(unitProcesses[unitProcess][criteria])
        })

        if (amount !== null) {
          costFactors.forEach(costFactor => {
            let outputCostStep = 0
            outputCostStep =
              outputCostStep +
              Number(unitProcesses[unitProcess][costFactor + '_c']) *
                Number(amount) ** Number(unitProcesses[unitProcess][costFactor + '_b'])

            outputCostPerFactor[costFactor] = outputCostPerFactor[costFactor] + outputCostStep

            if (costFactor === 'construction_cost') {
              annualizedCapex += (outputCostStep * 1.39 * 1.27) / unitProcesses[unitProcess]['useful_life']
            }
          })
        }
      })

      if (suitableTreatmentTrain) {
        outputQualities.push({
          id: index,
          treatmentTrain: treatmentTrain.id,
          treatmentTrainTitle: treatmentTrain.title, //not necessary
          turbidity: outputQualityPerFactor['turbidity'],
          tss: outputQualityPerFactor['tss'],
          bod: outputQualityPerFactor['bod'],
          cod: outputQualityPerFactor['cod'],
          fc: outputQualityPerFactor['fc'],
          tc: outputQualityPerFactor['tc'],
          constructionCost: outputCostPerFactor['construction_cost'],
          landRequirements: outputCostPerFactor['land_requirements'],
          energyRequirements: outputCostPerFactor['energy_requirements'],
          laborRequirements: outputCostPerFactor['labor_requirements'],
          otherOM: outputCostPerFactor['other_om'],

          capex: outputCostPerFactor['construction_cost'] * 1.39 * 1.27,
          annualizedCapex: annualizedCapex,
          annualizedCapexPerCubic: annualizedCapex / amount,

          rating: rating / treatmentTrain.unit_processes.length / evaluationCriteria.length
        })
      }
    })

    if (outputQualities.length === 0) {
      dispatch(setSolutionNoneAvailable(true))
    } else {
      dispatch(setSolutionNoneAvailable(false))
    }

    return outputQualities
  }

  function findTopTreatments(outputQualities) {
    let topThreeTreatments

    if (byCost) {
      topThreeTreatments = outputQualities.sort((a, b) => a.annualizedCapex - b.annualizedCapex).slice(0, 3)
    } else {
      topThreeTreatments = outputQualities.sort((a, b) => b.rating - a.rating).slice(0, 3)
    }

    return topThreeTreatments
  }

  const topThreeTreatments = findTopTreatments(findSuitableTreatments(input, enduse, treatmentFactors))

  dispatch(setSolutions(topThreeTreatments))
}
