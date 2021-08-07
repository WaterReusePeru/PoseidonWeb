import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

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
    paddingTop: 110
  },
  root: {
    flexGrow: 1,
    paddingTop: 120
  }
}))

export const Results = () => {
  const { t } = useTranslation()

  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <Typography variant="h6">{t('Results')}</Typography>
        </Paper>
      </div>
    </div>
  )
}
