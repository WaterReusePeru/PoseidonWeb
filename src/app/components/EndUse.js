import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import waterQualityFactors from '../data/waterQualityFactors.json'
import { setEndUseQualityCategory, setEndUseQualityClass } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Bar } from './Bar'
import { useTheme } from '@material-ui/core/styles'
import SolutionsBox from './SolutionsBox'

export default function EndUse() {
  const endUse = useSelector(state => state.case.endUse)
  const inputQuality = useSelector(state => state.case.inputQuality)

  const dispatch = useDispatch()

  const theme = useTheme()

  const { t } = useTranslation()
  const lang = i18next.language

  if (endUse.category === null) {
    dispatch(setEndUseQualityCategory(29))
  }

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid item container xs={endUse.qualityClass !== null ? 8 : 12} direction="row" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('End Use')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{t('Select the Category')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="category"
            options={waterQualityCategories.filter(category => category.input === false)}
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

        <Grid item container xs={12} justify="space-evenly" alignItems="center">
          {endUse.qualityClass !== null
            ? waterQualityFactors.map((f, index) => {
                const key = f.name

                return (
                  <div key={index} style={{ width: 'calc(1/6*80%' }}>
                    <Bar
                      factor={f.name}
                      unit={f.unit}
                      input={
                        waterQualities[inputQuality.qualityClass][key] < 0
                          ? null
                          : waterQualities[inputQuality.qualityClass][key]
                      }
                      output={
                        waterQualities[endUse.qualityClass][key] < 0 ? null : waterQualities[endUse.qualityClass][key]
                      }
                    />
                  </div>
                )
              })
            : waterQualityFactors.map((f, index) => {
                const key = f.name

                return (
                  <div key={index} style={{ width: 'calc(1/6*80%' }}>
                    <Bar
                      factor={f.name}
                      unit={f.unit}
                      input={
                        waterQualities[inputQuality.qualityClass][key] < 0
                          ? null
                          : waterQualities[inputQuality.qualityClass][key]
                      }
                    />
                  </div>
                )
              })}
        </Grid>

        <Grid item container xs={12} justify="space-evenly" alignItems="flex-start">
          <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
            <Grid item>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <g>
                  <rect width="20" height="20" fill={theme.palette.primary.main}></rect>
                </g>
              </svg>
            </Grid>
            <Grid item>
              <Typography variant="caption">{t('Input')}</Typography>
            </Grid>
          </Grid>

          <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
            <Grid item>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <g>
                  <rect width="20" height="20" fill={theme.palette.error.main}></rect>
                </g>
              </svg>
            </Grid>
            <Grid item>
              <Typography variant="caption">{t('End use, needs treatment')}</Typography>
            </Grid>
          </Grid>

          <Grid item container xs={3} direction="column" alignItems="center" justify="flex-start">
            <Grid item>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <g>
                  <rect width="20" height="20" fill={theme.palette.success.main}></rect>
                </g>
              </svg>
            </Grid>
            <Grid item>
              <Typography variant="caption">{t('End use, no treatment needed')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {endUse.qualityClass !== null ? (
        <Grid item container xs={4}>
          <SolutionsBox />
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  )
}
