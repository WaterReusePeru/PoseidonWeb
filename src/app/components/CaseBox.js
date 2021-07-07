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

export default function CaseBox() {
  const classes = useStyles()

  const caseState = useSelector(state => state.case)

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('Case Overview')}</Typography>
        </Grid>

        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item container justify="flex-start" spacing={1} xs={12} style={{ marginTop: 20 }}>
            <Grid item>
              <Chip label="1" color="primary" size="small" />
            </Grid>
            <Grid item>
              <Typography>{t('Community Information')}</Typography>
            </Grid>
          </Grid>
          {caseState.commInfo.countryID !== null ? (
            <>
              <Grid item xs={6}>
                <Typography>{t('Country')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? communityInfo[caseState.commInfo.countryID].name
                    : communityInfo[caseState.commInfo.countryID].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          {caseState.commInfo.currency !== null ? (
            <>
              <Grid item xs={6}>
                <Typography>{t('Currency')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {caseState.commInfo.currency === 0 ? 'USD' : communityInfo[caseState.commInfo.countryID].currency}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          <Grid item container justify="flex-start" spacing={1} xs={12} style={{ marginTop: 20 }}>
            <Grid item>
              <Chip label="2" color="primary" size="small" />
            </Grid>
            <Grid item>
              <Typography>{t('Input Quality & Quantity')}</Typography>
            </Grid>
          </Grid>
          {caseState.inputQuality.category !== null ? (
            <>
              <Grid item xs={6} container alignItems="flex-start">
                <Typography>{t('Category')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualityCategories[caseState.inputQuality.category].name
                    : waterQualityCategories[caseState.inputQuality.category].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          {caseState.inputQuality.qualityClass !== null ? (
            <>
              <Grid item xs={6} container alignItems="flex-start">
                <Typography>{t('Quality Class')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualities[caseState.inputQuality.qualityClass].name
                    : waterQualities[caseState.inputQuality.qualityClass].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          <Grid item container justify="flex-start" spacing={1} xs={12} style={{ marginTop: 20 }}>
            <Grid item>
              <Chip label="3" color="primary" size="small" />
            </Grid>
            <Grid item>
              <Typography>{t('End Use')}</Typography>
            </Grid>
          </Grid>
          {caseState.endUse.category !== null ? (
            <>
              <Grid item xs={6} container alignItems="flex-start">
                <Typography>{t('Category')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualityCategories[caseState.endUse.category].name
                    : waterQualityCategories[caseState.endUse.category].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          {caseState.endUse.qualityClass !== null ? (
            <>
              <Grid item xs={6} container alignItems="flex-start">
                <Typography>{t('Quality Class')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualities[caseState.endUse.qualityClass].name
                    : waterQualities[caseState.endUse.qualityClass].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          <Grid item container justify="flex-start" spacing={1} xs={12} style={{ marginTop: 20 }}>
            <Grid item>
              <Chip label="4" color="primary" size="small" />
            </Grid>
            <Grid item>
              <Typography>{t('Quantity')}</Typography>
            </Grid>
          </Grid>
          {caseState.quantity.amount !== null ? (
            <>
              <Grid item xs={6} container alignItems="flex-start">
                <Typography>{t('Average Quantity')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {caseState.quantity.amount}m&sup3;/{t('day')}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
