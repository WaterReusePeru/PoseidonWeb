import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import communityInfo from '../data/communityInfo'
import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'

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
  const lang = i18next.language

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('Solutions')}</Typography>
          <Typography>
            {t('Based on your input, the following treatment trains are best suited for the case.')}
          </Typography>
        </Grid>

        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item container justify="flex-start" spacing={1} xs={12} style={{ marginTop: 20 }}>
            <Grid item>
              <Chip label="1" color="secondary" size="small" />
            </Grid>
            <Grid item>
              <Typography>{t('Solution')}</Typography>
            </Grid>
            <Grid>
              <Typography>I'm a great solution</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
