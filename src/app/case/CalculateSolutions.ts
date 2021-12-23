import { useDispatch } from 'react-redux'
import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import { WaterQuality } from '../data/model'
import { OutputQuality } from '../data/model'
import { QualityFactor } from '../data/model'

import { findSuitableTreatments } from './findSuitableTreatments'

export default function CalculateSolutions(input: WaterQuality, enduse: WaterQuality, amount: number, byCost: boolean) {
  const dispatch = useDispatch()

  const qualityFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  let treatmentFactors: QualityFactor[] = []

  qualityFactors.forEach(qualityFactor=> {
    const key = qualityFactor as keyof WaterQuality
    if ((input[key] > enduse[key]) && (enduse[key] !== -1)) {
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(qualityFactor as QualityFactor)
    }
  })

  function findTopTreatments(outputQualities: OutputQuality[]) {
    let topThreeTreatments

    if (byCost) {
      topThreeTreatments = outputQualities.sort((a, b) => a.annualizedCapex - b.annualizedCapex).slice(0, 3)
    } else {
      topThreeTreatments = outputQualities.sort((a, b) => b.rating - a.rating).slice(0, 3)
    }

    return topThreeTreatments
  }

  const topThreeTreatments = findTopTreatments(findSuitableTreatments(input, enduse, treatmentFactors, amount))

  if (topThreeTreatments.length === 0) { //TODO: !
    dispatch(setSolutionNoneAvailable(true))
  } else {
    dispatch(setSolutionNoneAvailable(false))
  }

  console.log(topThreeTreatments)

  dispatch(setSolutions(topThreeTreatments))
}