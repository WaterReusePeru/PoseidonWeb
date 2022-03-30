import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { setCustomInputValues } from './caseSlice'
import { useTranslation } from 'react-i18next'
import { CustomWaterQuality, WaterQuality, waterQualityFactors } from '../data/model'
import { useAppSelector } from '../hooks'

export default function InputCustomValues() {
  const dispatch = useDispatch()
  const input = useAppSelector((state) => state.case.input)

  const { t } = useTranslation()

  interface CustomInput {
    id: number
    name: string
    validity: boolean
    value: number | undefined
  }

  var customInputState = waterQualityFactors.map((f, index) => {
    return { id: f.id, name: f.name, validity: true, value: input.customValues[f.name as keyof WaterQuality] }
  })

  const [customInput, setCustomInput] = React.useState(customInputState)

  const handleChangeQuantity = (id: number, value: number, maxValue: number) => {
    const objIndex = customInputState.findIndex((quality) => quality.id === id)
    let tempCustomInput: Array<CustomInput> = []
    customInput.forEach((val) => tempCustomInput.push(Object.assign({}, val)))

    tempCustomInput[objIndex].value = value

    setCustomInput(tempCustomInput)

    const customInputObject = tempCustomInput.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {})

    dispatch(setCustomInputValues(customInputObject))

    if (value >= 1 && value <= maxValue && Number.isInteger(Number(value))) {
      tempCustomInput[objIndex].validity = true
    } else {
      tempCustomInput[objIndex].validity = false
      setCustomInput(tempCustomInput)
    }
  }

  return (
    <>
      {waterQualityFactors.map((f) => {
        const key = f.name as keyof WaterQuality

        return (
          <Grid item container direction="row" xs={4} key={key}>
            <Grid item xs={3}>
              <Typography>{f.nameShort}</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                error={!customInput[f.id].validity}
                size="small"
                helperText={!customInput[f.id].validity ? t('Should be between 1 and') + ' ' + f.maxValue : ' '}
                id={f.name}
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => handleChangeQuantity(f.id, Number(event.target.value), Number(f.maxValue))}
                value={input.customValues[key] ? input.customValues[key] : ''}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{f.unit}</InputAdornment>,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}
