import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { setQuantity, setDistance, setHeightDifference } from '../case/caseSlice'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@material-ui/core/InputAdornment'
import SolutionsBox from './SolutionsBox'
import CalculateSolutions from '../case/CalculateSolutions'

export default function Quantity() {
  const quantity = useSelector(state => state.case.quantity)
  const dispatch = useDispatch()

  CalculateSolutions()

  const { t } = useTranslation()

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

  const [validDistance, setValidDistance] = React.useState(true)

  const handleChangeDistance = value => {
    if (value >= 1 && value <= 100000) {
      setValidDistance(true)
      dispatch(setDistance(value))
    } else {
      setValidDistance(false)
      dispatch(setDistance(null))
    }
  }

  const [validHeightDifference, setValidHeightDifference] = React.useState(true)

  const handleChangeHeightDifference = value => {
    if (value >= -1000 && value <= 1000) {
      setValidHeightDifference(true)
      dispatch(setHeightDifference(value))
    } else {
      setValidHeightDifference(false)
      dispatch(setHeightDifference(null))
    }
  }

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid item container xs={8} direction="row" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('Quantity')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ marginBottom: 20 }}>{t('Average Quantity')}</Typography>
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
            value={quantity.amount !== null ? quantity.amount : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Tooltip title="Information about amounts">
            <Chip style={{ marginBottom: 20 }} label="?" size="small" />
          </Tooltip>
        </Grid>

        <Grid item xs={4}>
          <Typography style={{ marginBottom: 20 }}>{t('Distance')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validDistance}
            helperText={!validDistance ? t("Number must be integer and between 1 and 100'000") : ' '}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => handleChangeDistance(event.target.value)}
            value={quantity.distance !== null ? quantity.distance : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Tooltip title="Information about distance">
            <Chip style={{ marginBottom: 20 }} label="?" size="small" />
          </Tooltip>
        </Grid>

        <Grid item xs={4}>
          <Typography style={{ marginBottom: 20 }}>{t('Height Difference')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!validHeightDifference}
            helperText={!validHeightDifference ? t("Number must be integer and between -1'000 and 1'000") : ' '}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => handleChangeHeightDifference(event.target.value)}
            value={quantity.heightDifference !== null ? quantity.heightDifference : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Tooltip title="Information about height differences">
            <Chip style={{ marginBottom: 20 }} label="?" size="small" />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item container xs={4}>
        <SolutionsBox />
      </Grid>
    </Grid>
  )
}
