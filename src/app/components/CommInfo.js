import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { communityInfoData } from '../data/formValues'
import { setCountry, setCurrency } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'

export default function CommInfo() {
  const commInfo = useSelector(state => state.case.commInfo)
  const dispatch = useDispatch()
  const countries = []
  communityInfoData.map(country => {
    return countries.push(country.name)
  })

  const usdObj = { id: 1000, currency: 'USD' }

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Community Information</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>Select the Country</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => (option.name ? option.name : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          value={commInfo.countryID !== null ? communityInfoData[commInfo.countryID] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about countries">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Typography>Select the Currency</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={[communityInfoData[commInfo.countryID], usdObj]}
          getOptionLabel={option => option.currency}
          getOptionSelected={(option, value) => option.currency === value.currency}
          onChange={(event, newValue) => dispatch(setCurrency(newValue.id))}
          disableClearable
          value={
            commInfo.currency !== null
              ? commInfo.currency === 0
                ? usdObj
                : communityInfoData[commInfo.countryID]
              : null
          }
          disabled={commInfo.countryID === null ? true : false}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about currencies">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
    </Grid>
  )
}
