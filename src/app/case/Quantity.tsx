import React from 'react'
import { Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { setQuantity, setDistance, setHeightDifference } from './caseSlice'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import SolutionsBox from './SolutionsBox'

export default function Quantity() {
  const quantity = useAppSelector((state) => state.case.quantity)

  const dispatch = useDispatch()

  const { t } = useTranslation()

  const [validQuantity, setValidQuantity] = React.useState(true)

  const handleChangeQuantity = (value: number) => {
    if (value >= 1 && value <= 20000 && Number.isInteger(Number(value))) {
      setValidQuantity(true)
      dispatch(setQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setQuantity(null))
    }
  }

  const [validDistance, setValidDistance] = React.useState(true)

  const handleChangeDistance = (value: number) => {
    if (value >= 1 && value <= 20000 && Number.isInteger(Number(value))) {
      setValidDistance(true)
      dispatch(setDistance(value))
    } else {
      setValidDistance(false)
      dispatch(setDistance(null))
    }
  }

  const [validHeightDifference, setValidHeightDifference] = React.useState(true)

  const handleChangeHeightDifference = (value: number) => {
    if (value >= -1000 && value <= 1000 && Number.isInteger(Number(value))) {
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
            helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChangeQuantity(Number(event.target.value))}
            value={quantity.amount !== null ? quantity.amount : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
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
            helperText={!validDistance ? t("Number must be integer and between 1 and 20'000") : ' '}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChangeDistance(Number(event.target.value))}
            value={quantity.distance !== null ? quantity.distance : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
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
              shrink: true,
            }}
            onChange={(event) => handleChangeHeightDifference(Number(event.target.value))}
            value={quantity.heightDifference !== null ? quantity.heightDifference : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
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
