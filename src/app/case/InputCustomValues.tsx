import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
//import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
//import { setCustomInput } from './caseSlice'
import { useTranslation } from 'react-i18next'
import { waterQualityFactors } from '../data/model'

export default function InputCustomValues() {
  const input = useAppSelector((state) => state.case.input)
  //const endUse = useAppSelector((state) => state.case.endUse)
  //const dispatch = useDispatch()

  const { t } = useTranslation()

  var validQuantityState = waterQualityFactors.map((f, index) => {
    //const key = f.name as keyof WaterQuality
    return { id: f.id, name: f.name, validity: true }
  })

  const [validQuantity, setValidQuantity] = React.useState(validQuantityState)

  const handleChangeQuantity = (id: number, value: number, maxValue: number) => {
    console.log(validQuantity)
    const objIndex = validQuantityState.findIndex((quality) => quality.id === id)
    if (value >= 1 && value <= maxValue && Number.isInteger(Number(value))) {
      validQuantityState[objIndex].validity = true
      setValidQuantity(validQuantityState)
      //dispatch(setInputQuantity(value))
    } else {
      validQuantityState[objIndex].validity = false
      setValidQuantity(validQuantityState)
      //dispatch(setInputQuantity(null))
    }
  }

  return (
    <>
      {waterQualityFactors.map((f, index) => {
        //const key = f.name as keyof WaterQuality

        return (
          <>
            <Grid item xs={1}>
              <Typography>{f.nameShort}</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                error={!validQuantity[f.id].validity}
                size="small"
                helperText={
                  !validQuantity[f.id].validity
                    ? t('Number should be integer and between 1 and') + ' ' + f.maxValue
                    : ' '
                }
                id={f.name}
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => handleChangeQuantity(f.id, Number(event.target.value), Number(f.maxValue))}
                value={null}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{f.unit}</InputAdornment>,
                }}
                fullWidth
              />
            </Grid>
          </>
        )
      })}
    </>
  )
}
