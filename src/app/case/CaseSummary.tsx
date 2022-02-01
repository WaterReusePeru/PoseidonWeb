import React from 'react'
import { useAppSelector } from '../hooks'

import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import communityInfo from '../data/communityInfo.json'
import waterQualities from '../data/waterQualities.json'

import PublicIcon from '@mui/icons-material/Public'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import BatteryFullIcon from '@mui/icons-material/BatteryFull'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export const CaseSummary = (props: { step: any }) => {
  const { step } = props

  const caseState = useAppSelector((state) => state.case)

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <div style={{ paddingTop: 5 }}>
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
            {caseState.inputQuality.qualityClass !== undefined ? (
              <Grid container alignItems="center" direction="row" spacing={0}>
                <ExitToAppIcon fontSize="small" color="primary" />
                <Typography variant="caption">
                  {lang === 'en'
                    ? waterQualities[caseState.inputQuality.qualityClass].name
                    : waterQualities[caseState.inputQuality.qualityClass].nameEs}
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

        {step === 3 ? (
          <Grid item>
            {caseState.quantity.amount !== undefined ? (
              <Grid container alignItems="center" direction="row" spacing={0}>
                <BatteryFullIcon fontSize="small" color="primary" />
                <Typography variant="caption">
                  {caseState.quantity.amount}m&sup3;/{t('day')}
                </Typography>
                {caseState.quantity.distance !== undefined ? (
                  <>
                    <ArrowRightAltIcon fontSize="small" color="primary" />
                    <Typography variant="caption">{caseState.quantity.distance}m</Typography>
                  </>
                ) : (
                  <div />
                )}

                {caseState.quantity.heightDifference !== undefined ? (
                  <>
                    <ArrowUpwardIcon fontSize="small" color="primary" />

                    <Typography variant="caption">{caseState.quantity.heightDifference}m</Typography>
                  </>
                ) : (
                  <div />
                )}
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
