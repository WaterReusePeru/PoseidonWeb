import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { setCustomEndUseValues } from './caseSlice'
import { useTranslation } from 'react-i18next'
import { WaterQuality, waterQualityFactors } from '../data/model'
import { useAppDispatch, useAppSelector } from '../hooks'
import i18next from 'i18next'
import { getLocalisedValue, Language } from '../i18n/languageFunctions'

export default function EndUseCustomValues() {
  const dispatch = useAppDispatch()
  const caseState = useAppSelector((state) => state.case)
  const endUse = useAppSelector((state) => state.case.endUse)

  const { t } = useTranslation()
  const lang = i18next.language as Language
  interface CustomEndUse {
    id: number
    name: string
    validity: boolean
    value: number | null
  }

  var customEndUseState = waterQualityFactors.map((f, index) => {
    return { id: f.id, name: f.name, validity: true, value: endUse.customValues[f.name as keyof WaterQuality] }
  })

  const [customEndUse, setCustomEndUse] = React.useState(customEndUseState)

  const handleChangeQuantity = (id: number, value: string, maxValue: number) => {
    const objIndex = customEndUseState.findIndex((quality) => quality.id === id)
    let tempCustomEndUse: Array<CustomEndUse> = []
    customEndUse.forEach((val) => tempCustomEndUse.push(Object.assign({}, val)))

    const parsedValue = value === '' ? null : Number(value)

    tempCustomEndUse[objIndex].value = parsedValue

    setCustomEndUse(tempCustomEndUse)

    const customEndUseObject = tempCustomEndUse.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.value }),
      {},
    )

    dispatch(setCustomEndUseValues(customEndUseObject))

    if (parsedValue !== null && parsedValue >= 0 && parsedValue <= maxValue) {
      tempCustomEndUse[objIndex].validity = true
    } else {
      tempCustomEndUse[objIndex].validity = false
      setCustomEndUse(tempCustomEndUse)
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
            <Grid item container direction="row" xs={inputWidth} key={key}>
              <Grid item xs={3}>
                <Typography>{getLocalisedValue(f, lang, 'name')}</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  error={!customEndUse[f.id].validity}
                  size="small"
                  helperText={!customEndUse[f.id].validity ? t('Expected between 0 and') + ' ' + f.maxValue : ' '}
                  id={f.name}
                  type="number"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => handleChangeQuantity(f.id, event.target.value, Number(f.maxValue))}
                  value={
                    endUse.customValues[key] !== undefined && endUse.customValues[key] !== null
                      ? endUse.customValues[key]
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
