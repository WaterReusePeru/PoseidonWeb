import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import { useAppSelector } from '../../hooks'
import { useDispatch } from 'react-redux'
import { setCurrency } from '../../case/caseSlice'

export const CustomToolbar = () => {
  const currency = useAppSelector((state) => state.case.commInfo.currency)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setCurrency(currency === 1 ? 1000 : 0))
  }

  return (
    <Tooltip title={'Change Currency'}>
      <IconButton onClick={handleClick}>{currency === 0 ? <AttachMoneyIcon /> : <MoneyOffIcon />}</IconButton>
    </Tooltip>
  )
}
