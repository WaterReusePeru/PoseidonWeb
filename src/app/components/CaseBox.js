import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import { communityInfoData } from '../data/communityInfo'
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
          <Grid item>
            <Chip label="1" color="primary" size="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography>{t('Community Information')}</Typography>
          </Grid>
          {caseState.commInfo.countryID !== null ? (
            <>
              <Grid item xs={6}>
                <Typography>{t('Country')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? communityInfoData[caseState.commInfo.countryID].name
                    : communityInfoData[caseState.commInfo.countryID].nameEs}
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
                  {caseState.commInfo.currency === 0 ? 'USD' : communityInfoData[caseState.commInfo.countryID].currency}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          <Grid item>
            <Chip label="2" color="primary" size="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography>{t('Input Quality & Quantity')}</Typography>
          </Grid>
          {caseState.inputQQ.category !== null ? (
            <>
              <Grid item xs={6} alignItems="flex-start">
                <Typography>{t('Category')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualityCategories[caseState.inputQQ.category].name
                    : waterQualityCategories[caseState.inputQQ.category].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          {caseState.inputQQ.qualityClass !== null ? (
            <>
              <Grid item xs={6} alignItems="flex-start">
                <Typography>{t('Quality Class')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {lang === 'en'
                    ? waterQualities[caseState.inputQQ.qualityClass].name
                    : waterQualities[caseState.inputQQ.qualityClass].nameEs}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          {caseState.inputQQ.quantity !== null ? (
            <>
              <Grid item xs={6} alignItems="flex-start">
                <Typography>{t('Average Quantity')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {caseState.inputQQ.quantity}m&sup3;/{t('day')}
                </Typography>
              </Grid>
            </>
          ) : (
            <div />
          )}
          <Grid item>
            <Chip label="3" color="primary" size="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography>{t('End Use')}</Typography>
          </Grid>
          <Grid item>
            <Chip label="4" color="primary" size="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography>{t('Personalize')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
