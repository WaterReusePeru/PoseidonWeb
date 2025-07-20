import { setSolutionNoneAvailable, setSolutionNoneCalculable, setSolutionNoneNeeded, setSolutions } from './caseSlice'
import {
  WaterQuality,
  OutputQuality,
  QualityFactor,
  CommunityInfo,
  CommunityInfoState,
  waterQualityFactors,
} from '../data/model'

import { findSuitableTreatments } from './findSuitableTreatments'
import { useAppDispatch } from '../hooks'

export default function CalculateSolutions(
  input: WaterQuality,
  endUse: WaterQuality,
  amount: number,
  byRating: boolean,
  commInfo: CommunityInfo,
  commInfoState: CommunityInfoState,
) {
  const dispatch = useAppDispatch()

  const qualityFactors = waterQualityFactors.map((f) => {
    return f.name
  })

  let treatmentFactors: QualityFactor[] = []

  const hasMissingInputForDefinedEndUse = qualityFactors.some((qualityFactor) => {
    const key = qualityFactor as keyof WaterQuality
    return (input[key] === null || input[key] === undefined) && endUse[key] !== null && endUse[key] !== undefined
  })

  if (hasMissingInputForDefinedEndUse) {
    dispatch(setSolutionNoneCalculable(true))
    return
  }

  if (!input || !endUse) {
    dispatch(setSolutionNoneNeeded(true))
  } else {
    qualityFactors.forEach((qualityFactor) => {
      const key = qualityFactor as keyof WaterQuality

      // Ensure both input and endUse have values for the factor
      if (key in input && key in endUse && endUse[key] !== undefined && endUse[key] !== null) {
        dispatch(setSolutionNoneNeeded(false))
        dispatch(setSolutionNoneCalculable(false))
        treatmentFactors.push(qualityFactor as QualityFactor)
      }
    })
  }

  if (!treatmentFactors || treatmentFactors.length === 0) {
    dispatch(setSolutionNoneNeeded(true))
  }

  function findTopTreatments(outputQualities: OutputQuality[]) {
    let topTreatments

    if (byRating) {
      topTreatments = outputQualities.sort((a, b) => b.rating - a.rating)
    } else {
      topTreatments = outputQualities.sort((a, b) => a.costPerCubic - b.costPerCubic)
    }

    return topTreatments
  }

  let topTreatments = [] // Reset to empty array

  topTreatments = findTopTreatments(
    findSuitableTreatments(input, endUse, treatmentFactors, amount, commInfo, commInfoState),
  )

  if (topTreatments.length === 0) {
    dispatch(setSolutionNoneAvailable(true))
  } else {
    dispatch(setSolutionNoneAvailable(false))
  }

  dispatch(setSolutions(topTreatments))
}
