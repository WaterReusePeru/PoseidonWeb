import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import Autocomplete from '@material-ui/lab/Autocomplete'
import communityInfo from '../data/communityInfo.json'
import { setCountry, setCurrency } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export default function CommInfo() {
  const commInfo = useAppSelector(state => state.case.commInfo)
  const dispatch = useDispatch()
  const countries = []
  communityInfo.map(country => {
    return countries.push(country.name)
  })

  const { t } = useTranslation()
  const lang = i18next.language

  const usdObj = { id: 1000, currency: 'USD' }

  if (commInfo.countryID === undefined) {
    dispatch(setCountry(0))
  }
  if (commInfo.currency === undefined) {
    dispatch(setCurrency(0))
  }

  console.log(commInfo, communityInfo)

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
          options={communityInfo}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined! )}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          value={commInfo.countryID !== undefined ? communityInfo[commInfo.countryID] : undefined}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title={t<string>('Information about countries')}>
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Currency')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="currency"
          options={[communityInfo[commInfo.countryID], usdObj]}
          getOptionLabel={option => option.currency}
          getOptionSelected={(option, value) => option.currency === value.currency}
          onChange={(event, newValue) => dispatch(setCurrency(newValue.id))}
          disableClearable
          value={
            commInfo.currency !== null ? (commInfo.currency === 0 ? usdObj : communityInfo[commInfo.countryID]) : undefined
          }
          disabled={commInfo.countryID === null ? true : false}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title={t<string>('Information about currencies')}>
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
