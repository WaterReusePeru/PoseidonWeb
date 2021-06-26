import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import { setEndUseQualityCategory, setEndUseQualityClass } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export default function EndUse() {
  const endUse = useSelector(state => state.case.endUse)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('End Use')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Category')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="category"
          options={waterQualityCategories}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityCategory(newValue.id))}
          disableClearable
          value={endUse.category !== null ? waterQualityCategories[endUse.category] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about categories">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Water Quality Class')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="quality"
          options={waterQualities.filter(q => q.category === endUse.category)}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityClass(newValue.id))}
          disableClearable
          value={endUse.qualityClass !== null ? waterQualities[endUse.qualityClass] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
          disabled={endUse.category === null ? true : false}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about water quality classes">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
    </Grid>
  )
}
