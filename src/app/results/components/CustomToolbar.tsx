import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCurrency } from '../../case/caseSlice'

export const CustomToolbar = () => {
  const currency = useAppSelector((state) => state.case.commInfo.currency)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setCurrency(currency === 1 ? 1000 : 0))
  }

  return (
    <Tooltip title={'Change Currency'}>
      <IconButton onClick={handleClick}>{currency === 0 ? <AttachMoneyIcon /> : <MoneyOffIcon />}</IconButton>
    </Tooltip>
  )
}
