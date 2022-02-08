import { Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import { waterQualityCategories, waterQualities } from '../data/model'
import { setInputQualityCategory, setInputQualityClass } from '../case/caseSlice'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'

export default function InputQuality() {
  const inputQuality = useAppSelector((state) => state.case.inputQuality)
  const endUse = useAppSelector((state) => state.case.endUse)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const waterQualityCategoryOptions = waterQualityCategories.filter((category) => category.input)

  const waterQualityOptions = waterQualities.filter((q) => q.category === inputQuality.category)

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
          <Typography variant="h6">{t('Input Quality')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{t('Select the Category')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="category"
            options={waterQualityCategoryOptions}
            getOptionLabel={(option) => (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined!)}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(event, newValue) => dispatch(setInputQualityCategory(newValue.id))}
            disableClearable
            value={inputQuality.category !== null ? waterQualityCategories[inputQuality.category] : undefined}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
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
            options={waterQualityOptions}
            getOptionLabel={(option) =>
              option ? (option.name ? (lang === 'en' ? option.name : option.nameEs) : undefined!) : 'workaround'
            }
            isOptionEqualToValue={(option, value) => option !== 0 && value !== 0 && option.name === value.name}
            onChange={(event, newValue) => newValue && dispatch(setInputQualityClass(newValue.id))}
            disableClearable
            value={inputQuality.qualityClass && waterQualities[inputQuality.qualityClass]}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            disabled={inputQuality.category === null ? true : false}
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Tooltip title="Information about water quality classes">
            <Chip label="?" size="small" />
          </Tooltip>
        </Grid>

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
