import { useDispatch } from 'react-redux'
import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import unitProcesses from '../data/unitProcesses'
import treatmentTrains from '../data/treatmentTrains'

export default function CalculateSolutions(input, enduse, amount) {
  const dispatch = useDispatch()

  const relevantFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  const costFactors = [
    'construction_cost',
    'land_requirements',
    'energy_requirements',
    'labor_requirements',
    'other_om'
  ]

  let treatmentFactors = []

  relevantFactors.forEach(factor => {
    if ((Number(input[factor]) > Number(enduse[factor])) & (Number(enduse[factor]) !== -1)) {
      //Check here if -1 and don't push?
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(factor)
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

  console.log(input, enduse, treatmentFactors)

  function findSuitableTreatments(input, endUse, factors) {
    let outputQualities = []

    treatmentTrains.forEach((treatmentTrain, index) => {
      let suitableTreatmentTrain = true
      let outputQualityPerFactor = []
      let outputCostPerFactor = []
      let rating = 0

      factors.forEach((factor, index) => {
        let outputQualityStep = Number(input[factor])
        treatmentTrain.unit_processes.forEach(unitProcess => {
          outputQualityStep = outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][factor])) / 100

          if (index === 0) {
            //do rating in the unitProcesses loop but not in the factors loop
            evaluationCriteria.forEach(criteria => {
              rating = rating + Number(unitProcesses[unitProcess][criteria])
            })

            if (amount !== null) {
              costFactors.forEach((factor, index) => {
                let outputCostStep = 0
                outputCostStep =
                  outputCostStep +
                  Number(unitProcesses[unitProcess][factor + '_c']) *
                    Number(amount) ** Number(unitProcesses[unitProcess][factor + '_b'])

                console.log(
                  treatmentTrain,
                  unitProcess,
                  factor,
                  Number(amount),
                  outputCostStep,
                  Number(unitProcesses[unitProcess][factor + '_b']),
                  Number(unitProcesses[unitProcess][factor + '_c'])
                )

                outputCostPerFactor[factor] = outputCostStep
              })
            }
          }
        })

        outputQualityPerFactor[factor] = outputQualityStep

        if (outputQualityPerFactor[factor] > Number(endUse[factor])) {
          suitableTreatmentTrain = false
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
