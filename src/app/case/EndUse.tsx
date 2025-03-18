import { Checkbox, FormControl, FormControlLabel, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setCustomQualityFactors, setCustomEndUse, setEndUseQualityCategory } from './caseSlice'
import { useTranslation } from 'react-i18next'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'

import EndUsePresets from './EndUsePresets'
import EndUseCustomValues from './EndUseCustomValues'
import React from 'react'
import { QualityFactor, waterQualityFactors } from '../data/model'
import { getLocalisedValue, Language } from '../i18n/languageFunctions'
import i18next from 'i18next'

export default function EndUse() {
    const caseState = useAppSelector((state) => state.case)

  const endUse = useAppSelector((state) => state.case.endUse)

  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language as Language

  const handleSetCustomEndUse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.value === 'true' ? true : false
    dispatch(setCustomEndUse(newState))
  }

  if (endUse.category === null) {
    dispatch(setEndUseQualityCategory(29))
  }

    const [qualityFactors, setQualityFactor] = React.useState<string[]>(caseState.qualityFactors)

  const handleSetQualityFactors = (event: SelectChangeEvent<typeof qualityFactors>) => {
      const isQualityFactor = (x: any): x is QualityFactor => event.target.value.includes(x)
  
      dispatch(
        setCustomQualityFactors(
          isQualityFactor(event.target.value) ? event.target.value.split(',') : event.target.value
        ),
      )
      if (event.target.value.length > 0) {
        setQualityFactor(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)
      }
    }

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid
        item
        container
        xs={endUse.qualityClass || endUse.customValueEntered ? 8 : 12}
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <Typography variant="h6">{t('End Use')}</Typography>
        </Grid>
        <Grid item xs={endUse.custom ? 4 : 8}>
          <FormControl>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel
                value="false"
                control={
                  <Radio
                    checked={endUse.custom === false}
                    onChange={handleSetCustomEndUse}
                    value={false}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                }
                label={t('Presets')}
              />
              <FormControlLabel
                value="true"
                control={
                  <Radio
                    checked={endUse.custom === true}
                    onChange={handleSetCustomEndUse}
                    value={true}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                  />
                }
                label={t('Custom')}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {endUse.custom ? (
          <Grid item xs={4}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                style={{ marginTop: 20 }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={qualityFactors}
                onChange={handleSetQualityFactors}
                renderValue={(selected) =>
                  selected
                    .map((val: string) => {
                      const factor = waterQualityFactors.find(
                        (f) => getLocalisedValue(f, lang, 'nameShort') === val || f.name === val
                      )
                      return factor ? getLocalisedValue(factor, lang, 'nameShort') : val
                    })
                    .join(', ')
                }                
              >
                {waterQualityFactors.map((factor) => (
                  <MenuItem key={factor.name} value={factor.name}>
                    <Checkbox checked={caseState.qualityFactors.indexOf(factor.name) > -1} />
                    <ListItemText primary={getLocalisedValue(factor, lang, 'nameLong')} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : null}

        {!endUse.custom ? <EndUsePresets /> : <EndUseCustomValues />}

        <QualityCompare />
      </Grid>
      {endUse.qualityClass || endUse.customValueEntered ? (
        <Grid item container xs={4}>
          <SolutionsBox />
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  )
}
