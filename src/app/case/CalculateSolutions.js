import { useDispatch } from 'react-redux'
import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import unitProcesses from '../data/unitProcesses'
import treatmentTrains from '../data/treatmentTrains'

export default function CalculateSolutions(comm, input, enduse, amount) {
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

  console.log(comm, input, enduse, amount)

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

      let annualizedConstructionCost = 0

      treatmentTrain.unit_processes.forEach(unitProcess => {
        evaluationCriteria.forEach(criteria => {
          rating = rating + Number(unitProcesses[unitProcess][criteria])
        })

        /* const r = Number(communityInfo[comm.countryID]['discountRate'])
        const n = Number(unitProcesses[unitProcess]['useful_life'])
        let crf = (r * (1 + r) ** n) / ((1 + r) ** n - 1) */

        if (amount !== null) {
          costFactors.forEach(costFactor => {
            let outputCostStep = 0
            outputCostStep =
              outputCostStep +
              Number(unitProcesses[unitProcess][costFactor + '_c']) *
                Number(amount) ** Number(unitProcesses[unitProcess][costFactor + '_b'])

            outputCostPerFactor[costFactor] = outputCostPerFactor[costFactor] + outputCostStep

            if (costFactor === 'construction_cost') {
              annualizedConstructionCost += outputCostStep / unitProcesses[unitProcess]['useful_life']
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
          construction_cost: outputCostPerFactor['construction_cost'],
          land_requirements: outputCostPerFactor['land_requirements'],
          energy_requirements: outputCostPerFactor['energy_requirements'],
          labor_requirements: outputCostPerFactor['labor_requirements'],
          other_om: outputCostPerFactor['other_om'],

          annualizedConstructionCost: annualizedConstructionCost,
          capex: outputCostPerFactor['construction_cost'] * 1.39 * 1.27,

          rating: rating / treatmentTrain.unit_processes.length / evaluationCriteria.length
        })
      }
    })

    if (outputQualities.length === 0) {
      dispatch(setSolutionNoneAvailable(true))
    } else {
      dispatch(setSolutionNoneAvailable(false))
    }

    console.log('output qualities', outputQualities)

    return outputQualities
  }

  function findTopTreatments(outputQualities) {
    const topThreeTreatments = outputQualities.sort((a, b) => b.rating - a.rating).slice(0, 3)

    console.log('top-three', topThreeTreatments)

    return topThreeTreatments
  }

  const topThreeTreatments = findTopTreatments(findSuitableTreatments(input, enduse, treatmentFactors))

  dispatch(setSolutions(topThreeTreatments))
}
