import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { CommunityInfo, PresetWaterQuality, WaterQualityCategory } from './data/model'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type Comparable = WaterQualityCategory | PresetWaterQuality | CommunityInfo

export function compare(a: Comparable, b: Comparable) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

export function showCost(v: number, commInfo: any, communityInfos: any) {
  return commInfo.currency === 0 ? (
    <>{Math.round(v * 1000).toLocaleString('de-CH')} $</>
  ) : (
    <>
      {(communityInfos[commInfo.countryID].exchangeToUSD * Math.round(v * 1000)).toLocaleString('de-CH')}{' '}
      {communityInfos[commInfo.countryID].currency}
    </>
  )
}
