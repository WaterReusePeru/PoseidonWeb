import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import { setInputQualityCategory, setInputQualityClass, setInputQuantity } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import InputAdornment from '@material-ui/core/InputAdornment'

export default function InputQQ() {
  const inputQQ = useSelector(state => state.case.inputQQ)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const [validQuantity, setValidQuantity] = React.useState(true)

  const handleChangeQuantity = value => {
    if (value >= 1 && value <= 1000000) {
      setValidQuantity(true)
      dispatch(setInputQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setInputQuantity(null))
    }
  }

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
          id="combo-box-demo"
          options={waterQualityCategories}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setInputQualityCategory(newValue.id))}
          disableClearable
          value={inputQQ.category !== null ? waterQualityCategories[inputQQ.category] : null}
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
          id="combo-box-demo"
          options={waterQualities.filter(q => q.category === inputQQ.category)}
          getOptionLabel={option => (option.name ? (lang === 'en' ? option.name : option.nameEs) : '')}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => dispatch(setInputQualityClass(newValue.id))}
          disableClearable
          value={inputQQ.qualityClass !== null ? waterQualities[inputQQ.qualityClass] : null}
          renderInput={params => <TextField {...params} variant="outlined" />}
          disabled={inputQQ.category === null ? true : false}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about water quality classes">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Average Quantity')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={!validQuantity}
          helperText={!validQuantity ? t('Value must be between 1 and 1 million') : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          disabled={inputQQ.qualityClass === null ? true : false}
          onChange={event => handleChangeQuantity(event.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center' }}>
        <Tooltip title="Information about amounts">
          <Chip label="?" size="small" />
        </Tooltip>
      </Grid>
    </Grid>
  )
}
