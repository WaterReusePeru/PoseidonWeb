import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { communityInfoData } from '../data/formValues'
import { setCountry } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'

export default function CommInfo() {
  //const commInfo = useSelector((state) => state.case.commInfo)
  const dispatch = useDispatch()
  const countries = []
  communityInfoData.map(country => {
    return countries.push(country.name)
  })

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Input Quality & Quantity</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>Select the Category</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => option.name}
          onChange={(event, newValue) => dispatch(setCountry(newValue.id))}
          disableClearable
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about countries">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Typography>Adequate Water Quality Class</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => option.currency}
          disableClearable
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about currencies">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Typography>Define Quantity</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => option.currency}
          disableClearable
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about currencies">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Typography>Average Amount</Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          id="combo-box-demo"
          options={communityInfoData}
          getOptionLabel={option => option.currency}
          disableClearable
          style={{ width: 300 }}
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
