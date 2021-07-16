import { useSelector, useDispatch } from 'react-redux'
import { setSolutionNoneNeeded } from './caseSlice'
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
      dispatch(setSolutionNoneNeeded(false))
      //Check here if -1 and don't push?
      treatmentFactors.push(factor)
    }
    return null
  })

  console.log(inputQuality, endUseQuality, treatmentFactors)

  function runUnitProcess(up, factor, input) {
    return Number(input) - Number(input) * unitProcesses[up][factor]
  }

  function runTreatmentTrain(factors, input) {
    factors.map(factor => {
      runUnitProcess(1, factor, input[factor])
      return null
    })
  }

  function findSuitableTreatmentTrains(input, factors) {
    let outputQualities = []

    treatmentTrains.map((treatmentTrain, index) => {
      let outputQualityPerFactor = []

      factors.map(factor => {
        let outputQualityStep = Number(input[factor])
        treatmentTrain.unit_processes.map(unitProcess => {
          outputQualityStep = outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][factor])) / 100
        })

        outputQualityPerFactor[factor] = outputQualityStep
      })

      outputQualities.push({
        id: index,
        treatmentTrain: treatmentTrain.title,
        turbidity: outputQualityPerFactor['turbidity'],
        tss: outputQualityPerFactor['tss'],
        bod: outputQualityPerFactor['bod'],
        cod: outputQualityPerFactor['cod'],
        fc: outputQualityPerFactor['fc'],
        tc: outputQualityPerFactor['tc']
      })
    })

    return outputQualities
  }

  console.log(findSuitableTreatmentTrains(inputQuality, treatmentFactors))

  console.log(caseState)
}
