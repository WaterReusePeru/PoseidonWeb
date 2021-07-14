import { useSelector, useDispatch } from 'react-redux'
import { setSolutionNoneNeeded } from './caseSlice'
import waterQualities from '../data/waterQualities'
import unitProcesses from '../data/unitProcesses'
//import treatmentTrains from '../data/treatmentTrains'

export default function CalculateSolutions() {
  const dispatch = useDispatch()

  const caseState = useSelector(state => state.case)

  const inputQuality = waterQualities[caseState.inputQuality.qualityClass]
  const endUseQuality = waterQualities[caseState.endUse.qualityClass]

  const relevantFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  let treatmentFactors = []

  console.log(inputQuality, endUseQuality)

  let noneNeeded = true

  relevantFactors.map(factor => {
    if (Number(inputQuality[factor]) > Number(endUseQuality[factor])) {
      noneNeeded = false
      //Check here if -1 and don't push?
      treatmentFactors.push(factor)
    }
    return null
  })

  console.log(treatmentFactors)

  function treat(up, factor, input) {
    console.log(up, factor, input)
    console.log(unitProcesses[up][factor])
    console.log(Number(input) - Number(input) * unitProcesses[up][factor])
    return Number(input) - Number(input) * unitProcesses[up][factor]
  }

  console.log(
    treatmentFactors.map(factor => {
      treat(1, factor, inputQuality[factor])
      return null
    })
  )

  if (noneNeeded === true) {
    dispatch(setSolutionNoneNeeded(true))
  } else {
    dispatch(setSolutionNoneNeeded(false))
  }

  console.log(caseState)
}
