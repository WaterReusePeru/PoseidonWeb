import React from 'react'

import makeStyles from '@mui/styles/makeStyles'

import Paper from '@mui/material/Paper'

import Typography from '@mui/material/Typography'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 50,
  },
  root: {
    flexGrow: 1,
    paddingTop: 60,
  },
}))

export default function Pestle() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.main}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Typography variant="h6">{t('PESTLE')}</Typography>
      </Paper>
    </div>
  )
}
