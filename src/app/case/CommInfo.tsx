import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { compare, useAppDispatch, useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import communityInfo from '../data/communityInfo.json'
import { communityInfos } from '../data/model'
import {
  setCountry,
  setCurrency,
  setLandCost,
  setElectricityCost,
  setStaffCost,
  setDictountRate,
  setValidCommInfo,
} from '../case/caseSlice'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Language, getLocalisedValue } from '../i18n/languageFunctions'

export default function CommInfo() {
  const commInfo = useAppSelector((state) => state.case.commInfo)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language as Language

  const usdObj = { id: 1000, currency: 'USD' }

  const currencyString =
    commInfo.currency !== null ? (commInfo.currency === 0 ? usdObj : communityInfo[commInfo.countryID]) : undefined

  if (commInfo.countryID === undefined) {
    dispatch(setCountry(0))
  }
  if (commInfo.currency === undefined) {
    dispatch(setCurrency(0))
  }

  const [validLandCost, setValidLandCost] = React.useState(true)
  const [validElectricityCost, setValidElectricityCost] = React.useState(true)
  const [validLStaffCost, setValidLStaffCost] = React.useState(true)
  const [validLDiscount, setValidLDiscount] = React.useState(true)

  const handleChangeCost = (cost: 'land' | 'electricity' | 'staff' | 'discount', value: number) => {
    switch (cost) {
      case 'land':
        setValidLandCost(value > 0 && value <= 1000000000)
        dispatch(setLandCost(value))
        break
      case 'electricity':
        setValidElectricityCost(value > 0 && value <= 100)
        dispatch(setElectricityCost(value))
        break
      case 'staff':
        setValidLStaffCost(value > 0 && value <= 1000)
        dispatch(setStaffCost(value))
        break
      case 'discount':
        setValidLDiscount(value > 0 && value <= 100)
        dispatch(setDictountRate(value))
        break
    }
  }

  function getCostNumber(type: 'landCost' | 'electricityCost' | 'staffCost') {
    const base = communityInfo[commInfo.countryID][type]
    if (commInfo.currency === 0) {
      return Math.round(base * 100) / 100
    }
    return Math.round(base * communityInfo[commInfo.countryID].exchangeToUSD * 100) / 100
  }

  React.useEffect(() => {
    if (validLandCost && validElectricityCost && validLStaffCost && validLDiscount) {
      dispatch(setValidCommInfo(true))
    } else {
      dispatch(setValidCommInfo(false))
    }
  }, [validLandCost, validElectricityCost, validLStaffCost, validLDiscount, dispatch])

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('Community Information')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Country')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="country"
          size="small"
          options={communityInfos.filter(() => true).sort(compare)} //Nonsense filter because TS doesn't find manage .sort() otherwise
          getOptionLabel={(option) => (option.name ? getLocalisedValue(option, lang, 'name') : undefined!)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          value={commInfo.countryID !== undefined ? communityInfo[commInfo.countryID] : undefined}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Currency')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="currency"
          size="small"
          options={[communityInfo[commInfo.countryID], usdObj]}
          getOptionLabel={(option) => option.currency}
          isOptionEqualToValue={(option, value) => option.currency === value.currency}
          onChange={(event, newValue) => dispatch(setCurrency(newValue.id))}
          disableClearable
          value={
            commInfo.currency !== null
              ? commInfo.currency === 0
                ? usdObj
                : communityInfo[commInfo.countryID]
              : undefined
          }
          disabled={commInfo.countryID === null ? true : false}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      {commInfo.currency !== null ? (
        <>
          <Grid item xs={4}>
            <Typography>{t('Land Cost per Hectare')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!validLandCost}
              helperText={!validLandCost ? t('Expected between 0 and') + ' 100\'000\'000' : ' '}
              size="small"
              id="standard-number"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleChangeCost('land', Number(event.target.value))}
              value={commInfo.landCost == null ? getCostNumber('landCost') : commInfo.landCost}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currencyString?.currency}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Electricity Cost per kWh')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!validElectricityCost}
              helperText={!validElectricityCost ? t('Expected between 0 and') + '100' : ' '}
              size="small"
              id="standard-number"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleChangeCost('electricity', Number(event.target.value))}
              value={commInfo.electricityCost == null ? getCostNumber('electricityCost') : commInfo.electricityCost}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currencyString?.currency}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Average Staff Cost per Hour')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!validLStaffCost}
              helperText={!validLStaffCost ? t('Expected between 0 and') + ' 1000' : ' '}
              size="small"
              id="standard-number"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleChangeCost('staff', Number(event.target.value))}
              value={commInfo.staffCost == null ? getCostNumber('staffCost') : commInfo.staffCost}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currencyString?.currency}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Discount Rate per Annum')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!validLDiscount}
              helperText={!validLDiscount ? t('Expected between 0 and') + ' 100' : ' '}
              size="small"
              id="standard-number"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleChangeCost('discount', Number(event.target.value))}
              value={
                commInfo.discountRate == null ? communityInfo[commInfo.countryID].discountRate : commInfo.discountRate
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </>
      ) : (
        <div />
      )}
    </Grid>
  )
}
