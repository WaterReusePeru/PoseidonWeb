import React from 'react'
import { InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
//import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
//import { setCustomInput } from './caseSlice'
import { useTranslation } from 'react-i18next'

export default function InputCustomValues() {
  const input = useAppSelector((state) => state.case.input)
  //const endUse = useAppSelector((state) => state.case.endUse)
  //const dispatch = useDispatch()

  const { t } = useTranslation()

  //const [validQuantity, setValidQuantity] = React.useState(true)

  /*   const handleChangeQuantity = (value: number) => {
    if (value >= 1 && value <= 20000 && Number.isInteger(Number(value))) {
      setValidQuantity(true)
      dispatch(setInputQuantity(value))
    } else {
      setValidQuantity(false)
      dispatch(setInputQuantity(null))
    }
  } */

  return (
    <>
      <Grid item xs={1}>
        <Typography>{t('Turbidity')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <Typography>{t('TSS')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <Typography>{t('BOD')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <Typography>{t('COD')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <Typography>{t('FC')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <Typography>{t('TC')}</Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          //error={!validQuantity}
          size="small"
          //helperText={!validQuantity ? t("Number must be integer and between 1 and 20'000") : ' '}
          id="standard-number"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          //onChange={(event) => handleChangeQuantity(Number(event.target.value))}
          value={input.quantity !== null ? input.quantity : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">m&sup3;/{t('day')}</InputAdornment>,
          }}
          fullWidth
        />
      </Grid>
    </>
  )
}
