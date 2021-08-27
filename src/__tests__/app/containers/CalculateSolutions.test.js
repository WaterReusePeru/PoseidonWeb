import '../../../app/i18n/i18n'
import store from '../../../app/store'
import {
  setCountry,
  setCurrency,
  setInputQualityCategory,
  setInputQualityClass,
  setEndUseQualityCategory,
  setEndUseQualityClass
} from '../../../app/case/caseSlice'
import CalculateSolutions from '../../../app/case/CalculateSolutions'

test('Get three good results', () => {
  let state = store.getState().case

  store.dispatch(setCountry(0))
  store.dispatch(setCurrency(0))
  store.dispatch(setInputQualityCategory(28))
  store.dispatch(setInputQualityClass(203))
  store.dispatch(setEndUseQualityCategory(29))
  store.dispatch(setEndUseQualityClass(210))

  CalculateSolutions()
})
