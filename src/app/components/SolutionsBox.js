import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import treatmentTrains from '../data/treatmentTrains.json'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    padding: 10
  }
}))

export default function SolutionsBox() {
  const classes = useStyles()

  const caseState = useSelector(state => state.case)

  const { t } = useTranslation()

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('Solutions')}</Typography>
          <Typography variant="caption">
            {caseState.solution.noneNeeded
              ? t(
                  'Based on your input, no treatment is needed because the input quality is better than the end use quality.'
                )
              : t('Based on your input, the following treatment trains are best suited for the case.')}
          </Typography>
        </Grid>

        {!caseState.solution.noneNeeded ? (
          <Grid item container xs={12} spacing={1} alignItems="center">
            <Grid item container justify="flex-start" spacing={1} xs={12}>
              <Grid item>
                <Chip label="1" color="secondary" size="small" />
              </Grid>
              <Grid item>
                <Typography>{t('Solution')}</Typography>
              </Grid>
            </Grid>
            <Grid item container justify="flex-start" spacing={1} xs={12}>
              <Typography>
                {caseState.solution1.treatmentTrain !== null
                  ? treatmentTrains[caseState.solution1.treatmentTrain].title
                  : 'none'}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </Paper>
  )
}
