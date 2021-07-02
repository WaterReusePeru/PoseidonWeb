import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import waterQualityFactors from '../data/waterQualityFactors.json'
import { setInputQualityCategory, setInputQualityClass } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Bar } from './Bar'

export default function InputQuality() {
  const inputQuality = useSelector(state => state.case.inputQuality)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('Input Quality & Quantity')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Select the Category')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="category"
          options={waterQualityCategories}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : null)}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setInputQualityCategory(newValue.id))}
          disableClearable
          value={inputQuality.category !== null ? waterQualityCategories[inputQuality.category] : null} //Peru is default Category
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
          options={waterQualities.filter(q => q.category === inputQuality.category)}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : null)}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setInputQualityClass(newValue.id))}
          disableClearable
          value={inputQuality.qualityClass !== null ? waterQualities[inputQuality.qualityClass] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
          disabled={inputQuality.category === null ? true : false}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about water quality classes">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>

      <Grid item container xs={12} justify="space-evenly" alignItems="center">
        {waterQualityFactors.map(f => {
          const key = f.name

          return (
            <div style={{ width: 'calc(1/6*80%' }}>
              <Bar
                factor={f.name}
                unit={f.unit}
                input={
                  inputQuality.qualityClass === null
                    ? null
                    : waterQualities[inputQuality.qualityClass][key] < 0
                    ? null
                    : waterQualities[inputQuality.qualityClass][key]
                }
              />
            </div>
          )
        })}
      </Grid>
    </Grid>
  )
}
