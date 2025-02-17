import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TranslateIcon from '@mui/icons-material/Translate'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import i18next from 'i18next'
import { Language } from './i18n/languageFunctions'
import { useTranslation } from 'react-i18next'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { t } = useTranslation()

  const handleChooseLanguage = (lang: Language) => {
    i18next.changeLanguage(lang)
    handleClose()
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<TranslateIcon />}
        endIcon={<ExpandMoreIcon />}
        color="inherit"
      >
        {t('English')}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem value="en" onClick={() => handleChooseLanguage('en')}>
          English
        </MenuItem>
        <MenuItem value="es" onClick={() => handleChooseLanguage('es')}>
          Español
        </MenuItem>
        <MenuItem value="es" onClick={() => handleChooseLanguage('ja')}>
          日本語
        </MenuItem>
      </Menu>
    </div>
  )
}
