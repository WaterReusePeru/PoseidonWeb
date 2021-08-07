import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
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
    paddingTop: 50
  },
  root: {
    flexGrow: 1,
    paddingTop: 60
  }
}))

export default function GeneralReference() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.main}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Typography variant="h6">{t('General Reference')}</Typography>
      </Paper>
    </div>
  )
}
