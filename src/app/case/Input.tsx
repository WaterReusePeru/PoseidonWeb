import React from 'react'
import { FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { setInputQuantity } from './caseSlice'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import SolutionsBox from './SolutionsBox'
import QualityCompare from './QualityCompare'
import Radio from '@mui/material/Radio'
import InputPresets from './InputPresets'
import InputCustomValues from './InputCustomValues'

export default function Input() {
  const input = useAppSelector((state) => state.case.input)
  const endUse = useAppSelector((state) => state.case.endUse)
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const [customInput, setCustomInput] = React.useState(false)

  const handleSetCustomInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(event.target.value === 'true' ? true : false)
  }

  const [validQuantity, setValidQuantity] = React.useState(true)

  const handleChangeQuantity = (value: number) => {
    if (value >= 1 && value <= 20000 && Number.isInteger(Number(value))) {
      setValidQuantity(true)
      dispatch(setInputQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setInputQuantity(null))
    }
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
        <Grid item xs={4}>
          <Typography variant="h6">{t('Input')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    checked={customInput === false}
                    onChange={handleSetCustomInput}
                    value={false}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                }
                label="Presets"
              />
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    checked={customInput === true}
                    onChange={handleSetCustomInput}
                    value={true}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                  />
                }
                label="Custom (Under construction)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {!customInput ? <InputPresets /> : <InputCustomValues />}

        <Grid item xs={4}>
          <Typography style={{ marginBottom: 20 }}>{t('Average Quantity')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            error={!validQuantity}
            size="small"
            helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
            id="standard-number"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChangeQuantity(Number(event.target.value))}
            value={input.quantity !== null ? input.quantity : null}
            InputProps={{
              endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
            }}
            fullWidth
          />
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
