import { useDispatch } from 'react-redux'
import { setSolutionCount, setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import { WaterQuality, OutputQuality, QualityFactor } from '../data/model'

import { findSuitableTreatments } from './findSuitableTreatments'

export default function CalculateSolutions(input: WaterQuality, enduse: WaterQuality, amount: number, byCost: boolean) {
  const dispatch = useDispatch()

  const qualityFactors = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']

  let treatmentFactors: QualityFactor[] = []

  qualityFactors.forEach((qualityFactor) => {
    const key = qualityFactor as keyof WaterQuality
    if (input[key] > enduse[key] && enduse[key] !== -1) {
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(qualityFactor as QualityFactor)
    }
  })

  function findTopTreatments(outputQualities: OutputQuality[]) {
    let topTreatments

    if (byCost) {
      topTreatments = outputQualities.sort((a, b) => a.annualizedCapex - b.annualizedCapex)
    } else {
      topTreatments = outputQualities.sort((a, b) => b.rating - a.rating)
    }

    return topTreatments
  }

  const topTreatments = findTopTreatments(findSuitableTreatments(input, enduse, treatmentFactors, amount))

  if (topTreatments.length === 0) {
    dispatch(setSolutionNoneAvailable(true))
  } else {
    dispatch(setSolutionNoneAvailable(false))
  }

  console.log(topTreatments)

  dispatch(setSolutionCount(topTreatments.length))

  dispatch(setSolutions(topTreatments))
}
