import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setCustomEndUse, setEndUseQualityCategory } from './caseSlice'
import { useTranslation } from 'react-i18next'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'

import EndUsePresets from './EndUsePresets'
import EndUseCustomValues from './EndUseCustomValues'

export default function EndUse() {
  const endUse = useAppSelector((state) => state.case.endUse)

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const handleSetCustomEndUse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.value === 'true' ? true : false
    dispatch(setCustomEndUse(newState))
  }

  if (endUse.category === null) {
    dispatch(setEndUseQualityCategory(29))
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
        <Grid item xs={8}>
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
