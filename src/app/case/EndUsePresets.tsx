import { Chip, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { compare, useAppDispatch, useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import { setEndUseQualityCategory, setEndUseQualityClass } from './caseSlice'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { getLocalisedValue, Language } from '../i18n/languageFunctions'

import { waterQualityCategories, waterQualities } from '../data/model'

export default function EndUse() {
  const endUse = useAppSelector((state) => state.case.endUse)

  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language as Language

  if (endUse.category === null) {
    dispatch(setEndUseQualityCategory(29))
  }

  return (
    <>
      <Grid item xs={4}>
        <Typography>{t('Select the Category')}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          id="category"
          size="small"
          options={waterQualityCategories.filter((category) => category.input === false).sort(compare)}
          getOptionLabel={(option) => (option.name ? (getLocalisedValue(option, lang, 'name')) : '')}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityCategory(newValue.id))}
          disableClearable
          value={endUse.category || endUse.category === 0 ? waterQualityCategories[endUse.category] : undefined}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>

      <Grid item xs={4}>
        <Typography>{t('Water Quality Class')}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Autocomplete
          id="quality"
          size="small"
          options={waterQualities.filter((q) => q.category === endUse.category)}
          getOptionLabel={(option) => (option.name ? (getLocalisedValue(option, lang, 'name')) : '')}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setEndUseQualityClass(newValue.id))}
          disableClearable
          value={endUse.qualityClass ? waterQualities[endUse.qualityClass] : undefined}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          disabled={endUse.category === null ? true : false}
        />
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'center' }}>
        {endUse.qualityClass !== undefined && waterQualities[endUse.qualityClass].note ? (
          <Tooltip
            title={getLocalisedValue(waterQualities[endUse.qualityClass], lang, 'note')}
          >
            <Chip label={'?'} key={waterQualities[endUse.qualityClass].id} size="small" style={{ margin: 2 }} />
          </Tooltip>
        ) : null}
      </Grid>
    </>
  )
}
