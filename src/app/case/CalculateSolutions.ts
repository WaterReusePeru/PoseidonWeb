import { setSolutionNoneAvailable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import { WaterQuality, OutputQuality, QualityFactor, CommunityInfo, waterQualityFactors } from '../data/model'

import { findSuitableTreatments } from './findSuitableTreatments'
import { useAppDispatch } from '../hooks'

export default function CalculateSolutions(
  input: WaterQuality,
  endUse: WaterQuality,
  amount: number,
  byRating: boolean,
  commInfo: CommunityInfo
) {
  const dispatch = useAppDispatch()

  const qualityFactors = waterQualityFactors.map((f) => {
    return f.name
  })

  let treatmentFactors: QualityFactor[] = []

  qualityFactors.forEach((qualityFactor) => {
    const key = qualityFactor as keyof WaterQuality
    if (key in input && key in endUse && input[key] > endUse[key] && endUse[key] !== null) {
      dispatch(setSolutionNoneNeeded(false))
      treatmentFactors.push(qualityFactor as QualityFactor)
    }
  })

  function findTopTreatments(outputQualities: OutputQuality[]) {
    let topTreatments

    if (byRating) {
      topTreatments = outputQualities.sort((a, b) => b.rating - a.rating)
    } else {
      topTreatments = outputQualities.sort((a, b) => a.costPerCubic - b.costPerCubic)
    }

    return topTreatments
  }

  const topTreatments = findTopTreatments(findSuitableTreatments(input, endUse, treatmentFactors, amount, commInfo))

  if (topTreatments.length === 0) {
    dispatch(setSolutionNoneAvailable(true))
  } else {
    dispatch(setSolutionNoneAvailable(false))
  }

  dispatch(setSolutions(topTreatments))
}
