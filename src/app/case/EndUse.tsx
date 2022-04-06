import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { compare, useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import { setEndUseQualityCategory, setEndUseQualityClass } from './caseSlice'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'

import { waterQualityCategories, waterQualities } from '../data/model'

export default function EndUse() {
  const endUse = useAppSelector((state) => state.case.endUse)

  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  if (endUse.category === null) {
    dispatch(setEndUseQualityCategory(29))
  }

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid
        item
        container
        xs={endUse.qualityClass !== undefined ? 8 : 12}
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h6">{t('End Use')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{t('Select the Category')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="category"
            size="small"
            options={waterQualityCategories.filter((category) => category.input === false).sort(compare)}
            getOptionLabel={(option) => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(event, newValue) => dispatch(setEndUseQualityCategory(newValue.id))}
            disableClearable
            value={endUse.category ? waterQualityCategories[endUse.category] : undefined}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>{t('Water Quality Class')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="quality"
            size="small"
            options={waterQualities.filter((q) => q.category === endUse.category)}
            getOptionLabel={(option) => (option.name! ? (lang === 'en' ? option.name : option.nameEs) : '')}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(event, newValue) => dispatch(setEndUseQualityClass(newValue.id))}
            disableClearable
            value={endUse.qualityClass ? waterQualities[endUse.qualityClass] : undefined}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            disabled={endUse.category === null ? true : false}
          />
        </Grid>

        <Grid item xs={12} />

        <QualityCompare />
      </Grid>
      {endUse.qualityClass !== undefined ? (
        <Grid item container xs={4}>
          <SolutionsBox />
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  )
}
