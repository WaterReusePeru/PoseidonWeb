import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { compare, useAppDispatch, useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import { waterQualityCategories, waterQualities } from '../data/model'
import { setInputQualityCategory, setInputQualityClass } from './caseSlice'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export default function InputPresets() {
  const input = useAppSelector((state) => state.case.input)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const waterQualityOptions = waterQualities.filter((q) => q.category === input.category)

  return (
    <>
      <Grid item xs={4}>
        <Typography>{t('Select the Category')}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          id="category"
          size="small"
          options={waterQualityCategories.filter((category) => category.input).sort(compare)}
          getOptionLabel={(option) => (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined!)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setInputQualityCategory(newValue.id))}
          disableClearable
          value={input.category || input.category === 0 ? waterQualityCategories[input.category] : undefined}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>

      <Grid item xs={4}>
        <Typography>{t('Water Quality Class')}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          id="quality"
          size="small"
          options={waterQualityOptions}
          getOptionLabel={(option) =>
            option ? (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined!) : ''
          }
          isOptionEqualToValue={(option, value) => option !== 0 && value !== 0 && option.name === value.name}
          onChange={(event, newValue) => newValue && dispatch(setInputQualityClass(newValue.id))}
          disableClearable
          value={input.qualityClass && waterQualities[input.qualityClass]}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Grid>
    </>
  )
}
