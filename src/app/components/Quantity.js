import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { setQuantity } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Bar } from './Bar'

export default function Quantity() {
  const Quantity = useSelector(state => state.case.Quantity)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const [validQuantity, setValidQuantity] = React.useState(true)

  const handleChangeQuantity = value => {
    if (value >= 1 && value <= 1000000) {
      setValidQuantity(true)
      dispatch(setQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setQuantity(null))
    }
  }

  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('Quantity')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{t('Average Quantity')}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={!validQuantity}
          helperText={!validQuantity ? t('Number must be integer and between 1 and 1 million') : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={event => handleChangeQuantity(event.target.value)}
          value={Quantity.quantity !== null ? Quantity.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>
          }}
          fullWidth
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
