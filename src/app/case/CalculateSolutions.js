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
      //Check here if -1 and don't push?
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(factor)
    }
    return null
  })

  console.log(inputQuality, endUseQuality, treatmentFactors)

  function findSuitableTreatmentTrains(input, factors) {
    let outputQualities = []

    treatmentTrains.map((treatmentTrain, index) => {
      let outputQualityPerFactor = []

      factors.map(factor => {
        let outputQualityStep = Number(input[factor])
        treatmentTrain.unit_processes.map(unitProcess => {
          outputQualityStep = outputQualityStep - (outputQualityStep * Number(unitProcesses[unitProcess][factor])) / 100

          return null
        })

        outputQualityPerFactor[factor] = outputQualityStep

        return null
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

      return null
    })

    return outputQualities
  }

  console.log(findSuitableTreatmentTrains(inputQuality, treatmentFactors))

  console.log(caseState)
}
