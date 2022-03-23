import React from 'react'
import { useAppSelector } from '../hooks'

import Grid from '@mui/material/Grid'
import makeStyles from '@mui/styles/makeStyles'
import { Theme, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import communityInfo from '../data/communityInfo.json'
import waterQualities from '../data/waterQualities.json'

import PublicIcon from '@mui/icons-material/Public'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import BatteryFullIcon from '@mui/icons-material/BatteryFull'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },
}))

export const CaseSummary = (props: { step: any }) => {
  const { step } = props

  const caseState = useAppSelector((state) => state.case)

  const { t } = useTranslation()
  const lang = i18next.language

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid item container spacing={1} alignItems="flex-start">
        {step === 0 ? (
          <>
            <Grid item>
              {caseState.commInfo.countryID !== undefined ? (
                <Grid container alignItems="center" direction="row" spacing={0}>
                  <PublicIcon fontSize="small" color="primary" />

                  <Typography variant="caption">
                    {lang === 'en'
                      ? communityInfo[caseState.commInfo.countryID].name
                      : communityInfo[caseState.commInfo.countryID].nameEs}
                  </Typography>
                  {caseState.commInfo.currency !== null ? (
                    <>
                      <AttachMoneyIcon fontSize="small" color="primary" />
                      <Typography variant="caption">
                        {caseState.commInfo.currency === 0
                          ? 'USD'
                          : communityInfo[caseState.commInfo.countryID].currency}
                      </Typography>
                    </>
                  ) : (
                    <div />
                  )}
                </Grid>
              ) : (
                <div />
              )}
            </Grid>
          </>
        ) : (
          <div />
        )}

        {step === 1 ? (
          <Grid item>
            {caseState.input.qualityClass !== undefined ? (
              <Grid container alignItems="center" direction="row" spacing={0}>
                <ExitToAppIcon fontSize="small" color="primary" />
                <Typography variant="caption">
                  {lang === 'en'
                    ? waterQualities[caseState.input.qualityClass].name
                    : waterQualities[caseState.input.qualityClass].nameEs}
                </Typography>
                <BatteryFullIcon fontSize="small" color="primary" />
                <Typography variant="caption">
                  {caseState.input.quantity}m&sup3;/{t('day')}
                </Typography>
              </Grid>
            ) : (
              <div />
            )}
          </Grid>
        ) : (
          <div />
        )}

        {step === 2 ? (
          <Grid item>
            {caseState.endUse.qualityClass !== undefined ? (
              <Grid container alignItems="center" direction="row" spacing={0}>
                <AutorenewIcon fontSize="small" color="primary" />
                <Typography variant="caption">
                  {lang === 'en'
                    ? waterQualities[caseState.endUse.qualityClass].name
                    : waterQualities[caseState.endUse.qualityClass].nameEs}
                </Typography>
              </Grid>
            ) : (
              <div />
            )}
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </div>
  )
}
