import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TranslateIcon from '@material-ui/icons/Translate'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import i18next from 'i18next'

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChooseLanguage = lang => {
    console.log(lang)
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
      >
        {i18next.language === 'en' ? 'English' : 'Español'}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem value="en" onClick={() => handleChooseLanguage('en')}>
          English
        </MenuItem>
        <MenuItem value="es" onClick={() => handleChooseLanguage('es')}>
          Español
        </MenuItem>
      </Menu>
    </div>
  )
}
