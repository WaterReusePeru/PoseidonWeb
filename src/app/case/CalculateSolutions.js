import { useSelector, useDispatch } from 'react-redux'
import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import waterQualities from '../data/waterQualities'
import unitProcesses from '../data/unitProcesses'
import treatmentTrains from '../data/treatmentTrains'

export default function CalculateSolutions() {
  const dispatch = useDispatch()

  const caseState = useSelector(state => state.case)

  const inputQuality = waterQualities[caseState.inputQuality.qualityClass]
  const endUseQuality = waterQualities[caseState.endUse.qualityClass]

  const relevantFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  let treatmentFactors = []

  relevantFactors.map(factor => {
    if ((Number(inputQuality[factor]) > Number(endUseQuality[factor])) & (endUseQuality[factor] !== -1)) {
      //Check here if -1 and don't push?
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(factor)
    }
    return null
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

  console.log(inputQuality, endUseQuality, treatmentFactors)

  function findSuitableTreatments(input, endUse, factors) {
    let outputQualities = []

    treatmentTrains.map((treatmentTrain, index) => {
      let suitableTreatmentTrain = true
      let outputQualityPerFactor = []
      let rating = 0

      factors.map((factor, index) => {
        let outputQualityStep = Number(input[factor])
        treatmentTrain.unit_processes.map(unitProcess => {
          outputQualityStep = outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][factor])) / 100

          if (index === 0) {
            //do rating in the unitProcesses loop but not in the factors loop
            evaluationCriteria.map(criteria => {
              rating = rating + Number(unitProcesses[unitProcess][criteria])

              return null
            })
          }

          return null
        })

        outputQualityPerFactor[factor] = outputQualityStep

        if (outputQualityPerFactor[factor] > Number(endUse[factor])) {
          suitableTreatmentTrain = false
        }

        return null
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
          rating: rating / treatmentTrain.unit_processes.length / evaluationCriteria.length
        })
      }

      return null
    })

    if (outputQualities.length === 0) {
      dispatch(setSolutionNoneAvailable(true))
    }

    console.log('output qualities', outputQualities)

    return outputQualities
  }

  function findTopTreatments(outputQualities) {
    const topThreeTreatments = outputQualities.sort((a, b) => b.rating - a.rating).slice(0, 3)

    console.log('top-three', topThreeTreatments)

    return topThreeTreatments
  }

  /* console.log('output qualities', findSuitableTreatments(inputQuality, endUseQuality, treatmentFactors))

  console.log('top-three', findTopTreatments(findSuitableTreatments(inputQuality, endUseQuality, treatmentFactors))) */

  const topThreeTreatments = findTopTreatments(findSuitableTreatments(inputQuality, endUseQuality, treatmentFactors))

  dispatch(setSolutions(topThreeTreatments))

  console.log(caseState)
}
