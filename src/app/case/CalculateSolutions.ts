import { useDispatch } from 'react-redux'
import { setSolutionCount, setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import { WaterQuality, OutputQuality, QualityFactor, CommunityInfo, waterQualityFactors } from '../data/model'

import { findSuitableTreatments } from './findSuitableTreatments'

export default function CalculateSolutions(
  input: WaterQuality,
  enduse: WaterQuality,
  amount: number,
  byRating: boolean,
  commInfo: CommunityInfo
) {
  const dispatch = useDispatch()

  const qualityFactors = waterQualityFactors.map((f) => {
    return f.name
  })

  let treatmentFactors: QualityFactor[] = []

  qualityFactors.forEach((qualityFactor) => {
    const key = qualityFactor as keyof WaterQuality
    if (input[key]! > enduse[key]! && enduse[key] !== null) {
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(qualityFactor as QualityFactor)
    }
  })

  function findTopTreatments(outputQualities: OutputQuality[]) {
    let topTreatments

    if (byRating) {
      topTreatments = outputQualities.sort((a, b) => b.rating - a.rating)
    } else {
      topTreatments = outputQualities.sort((a, b) => a.annualizedCapex - b.annualizedCapex)
    }

    return topTreatments
  }

  const topTreatments = findTopTreatments(findSuitableTreatments(input, enduse, treatmentFactors, amount, commInfo))

  if (topTreatments.length === 0) {
    dispatch(setSolutionNoneAvailable(true))
  } else {
    dispatch(setSolutionNoneAvailable(false))
  }

  console.log(topTreatments)

  dispatch(setSolutionCount(topTreatments.length))

  dispatch(setSolutions(topTreatments))
}
