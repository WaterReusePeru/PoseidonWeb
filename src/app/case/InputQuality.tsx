import { Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import Autocomplete from '@mui/material/Autocomplete'
import { waterQualityCategories, waterQualities, WaterQuality, waterQualityFactors } from '../data/model'
import { setInputQualityCategory, setInputQualityClass } from '../case/caseSlice'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Bar } from './Bar'
import { useTheme } from '@mui/material/styles'

export default function InputQuality() {
  const inputQuality = useAppSelector((state) => state.case.inputQuality)
  const dispatch = useDispatch()

  const theme = useTheme()

  const { t } = useTranslation()
  const lang = i18next.language

  const waterQualityCategoryOptions = waterQualityCategories.filter((category) => category.input)

  const waterQualityOptions = waterQualities.filter((q) => q.category === inputQuality.category)

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
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

      <Grid item container xs={12} justifyContent="space-evenly" alignItems="center">
        {inputQuality.qualityClass !== undefined
          ? waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              return (
                <div key={index} style={{ width: 'calc(1/6*80%' }}>
                  <Bar
                    factor={f.name}
                    unit={f.unit}
                    input={
                      inputQuality.qualityClass === undefined
                        ? null
                        : waterQualities[inputQuality.qualityClass][key] < 0
                        ? null
                        : waterQualities[inputQuality.qualityClass][key]
                    }
                    average={waterQualities[0][key]}
                  />
                </div>
              )
            })
          : waterQualityFactors.map((f, index) => {
              return (
                <div key={index} style={{ width: 'calc(1/6*80%' }}>
                  <Bar factor={f.name} unit={f.unit} />
                </div>
              )
            })}
      </Grid>

      <Grid item container xs={12} justifyContent="space-evenly" alignItems="flex-start">
        <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <g>
                <rect width="20" height="20" fill={theme.palette.primary.main}></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('Input into Treatment Train')}</Typography>
          </Grid>
        </Grid>

        <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <g>
                <rect width="20" height="20" fill={theme.palette.action.disabled}></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('Typical untreated domestic wastewater')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
