import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { setCustomInputValues } from './caseSlice'
import { useTranslation } from 'react-i18next'
import { getLocalisedValue, Language } from '../i18n/languageFunctions'
import { WaterQuality, waterQualityFactors } from '../data/model'
import { useAppDispatch, useAppSelector } from '../hooks'
import i18next from 'i18next'

export default function InputCustomValues() {
  const dispatch = useAppDispatch()
  const caseState = useAppSelector((state) => state.case)
  const input = useAppSelector((state) => state.case.input)

  const { t } = useTranslation()

  const lang = i18next.language as Language

  interface CustomInput {
    id: number
    name: string
    validity: boolean
    value: number | null
  }

  var customInputState = waterQualityFactors.map((f, index) => {
    return { id: f.id, name: f.name, validity: true, value: input.customValues[f.name as keyof WaterQuality] }
  })

  const [customInput, setCustomInput] = React.useState(customInputState)

  const handleChangeQuantity = (id: number, value: string, maxValue: number) => {
    const objIndex = customInputState.findIndex((quality) => quality.id === id)
    let tempCustomInput: Array<CustomInput> = []
    customInput.forEach((val) => tempCustomInput.push(Object.assign({}, val)))

    // Handle empty input as null
    const parsedValue = value === '' ? null : Number(value)

    tempCustomInput[objIndex].value = parsedValue

    setCustomInput(tempCustomInput)

    const customInputObject = tempCustomInput.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {})

    dispatch(setCustomInputValues(customInputObject))

    if (parsedValue !== null && parsedValue >= 0 && parsedValue <= maxValue) {
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

        if (caseState.qualityFactors.includes(f.name)) {
          const length = caseState.qualityFactors.length

          const inputWidth = length === 1 || length === 2 || length === 4 ? 6 : 4

          return (
            <Grid item container direction="row" xs={inputWidth} key={key} spacing={3}>
              <Grid item xs={3}>
                <Typography>{getLocalisedValue(f, lang, 'nameShort')}</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  error={!customInput[f.id].validity}
                  size="small"
                  helperText={!customInput[f.id].validity ? t('Expected between 0 and') + ' ' + f.maxValue : ' '}
                  id={f.name}
                  type="number"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => handleChangeQuantity(f.id, event.target.value, Number(f.maxValue))}
                  value={
                    input.customValues[key] !== undefined && input.customValues[key] !== null
                      ? input.customValues[key]
                      : ''
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{f.unit}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          )
        } else {
          return null
        }
      })}
    </>
  )
}
