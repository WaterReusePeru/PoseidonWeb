import { Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { compare, useAppDispatch, useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import communityInfo from '../data/communityInfo.json'
import { communityInfos } from '../data/model'
import { setCountry, setCurrency } from '../case/caseSlice'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export default function CommInfo() {
  const commInfo = useAppSelector((state) => state.case.commInfo)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const usdObj = { id: 1000, currency: 'USD' }

  if (commInfo.countryID === undefined) {
    dispatch(setCountry(0))
  }
  if (commInfo.currency === undefined) {
    dispatch(setCurrency(0))
  }

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
          getOptionLabel={(option) => (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined!)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          value={commInfo.countryID !== undefined ? communityInfo[commInfo.countryID] : undefined}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title={t('Information about countries')}>
          <Chip label="?" size="small" />
        </Tooltip>
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
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title={t('Information about currencies')}>
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      {commInfo.currency !== null ? (
        <>
          <Grid item xs={4}>
            <Typography>{t('Land Cost')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {commInfo.currency === 0
                ? Math.round(communityInfo[commInfo.countryID].landCost * 100) / 100 + ' ' + usdObj.currency
                : Math.round(
                    communityInfo[commInfo.countryID].landCost * communityInfo[commInfo.countryID].exchangeToUSD * 100
                  ) /
                    100 +
                  ' ' +
                  communityInfo[commInfo.countryID].currency}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Electricity Cost')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {commInfo.currency === 0
                ? Math.round(communityInfo[commInfo.countryID].electricityCost * 100) / 100 + ' ' + usdObj.currency
                : Math.round(
                    communityInfo[commInfo.countryID].electricityCost *
                      communityInfo[commInfo.countryID].exchangeToUSD *
                      100
                  ) /
                    100 +
                  ' ' +
                  communityInfo[commInfo.countryID].currency}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Personal Cost')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {commInfo.currency === 0
                ? Math.round(communityInfo[commInfo.countryID].personalCost * 100) / 100 + ' ' + usdObj.currency
                : Math.round(
                    communityInfo[commInfo.countryID].personalCost *
                      communityInfo[commInfo.countryID].exchangeToUSD *
                      100
                  ) /
                    100 +
                  ' ' +
                  communityInfo[commInfo.countryID].currency}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{t('Discount Rate')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{communityInfo[commInfo.countryID].discountRate * 100 + '%'}</Typography>
          </Grid>
        </>
      ) : (
        <div />
      )}
    </Grid>
  )
}
