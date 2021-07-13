import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import communityInfo from '../data/communityInfo'
import waterQualities from '../data/waterQualities.json'

import PublicIcon from '@material-ui/icons/Public'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import InputIcon from '@material-ui/icons/Input'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import BatteryFullIcon from '@material-ui/icons/BatteryFull'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

export const CaseSummary = props => {
  const { step } = props

  const caseState = useSelector(state => state.case)

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <div style={{ paddingTop: 5 }}>
      <Grid item container spacing={1} alignItems="flex-start">
        {step === 0 ? (
          <>
            <Grid item>
              {caseState.commInfo.countryID !== null ? (
                <Grid container alignItems="center" spacing={1} justify="center">
                  <Grid item>
                    <PublicIcon fontSize="small" color="primary" />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {lang === 'en'
                        ? communityInfo[caseState.commInfo.countryID].name
                        : communityInfo[caseState.commInfo.countryID].nameEs}
                    </Typography>
                  </Grid>
                  {caseState.commInfo.currency !== null ? (
                    <>
                      <Grid item>
                        <AttachMoneyIcon fontSize="small" color="primary" />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          {caseState.commInfo.currency === 0
                            ? 'USD'
                            : communityInfo[caseState.commInfo.countryID].currency}
                        </Typography>
                      </Grid>
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
            {caseState.inputQuality.qualityClass !== null ? (
              <Grid container alignItems="center" spacing={1} justify="center">
                <Grid item>
                  <InputIcon fontSize="small" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    {lang === 'en'
                      ? waterQualities[caseState.inputQuality.qualityClass].name
                      : waterQualities[caseState.inputQuality.qualityClass].nameEs}
                  </Typography>
                </Grid>
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
            {caseState.endUse.qualityClass !== null ? (
              <Grid container alignItems="center" spacing={1} justify="center">
                <Grid item>
                  <AutorenewIcon fontSize="small" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    {lang === 'en'
                      ? waterQualities[caseState.endUse.qualityClass].name
                      : waterQualities[caseState.endUse.qualityClass].nameEs}
                  </Typography>
                </Grid>
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
            {caseState.quantity.amount !== null ? (
              <Grid container alignItems="center" spacing={1} justify="center">
                <Grid item>
                  <BatteryFullIcon fontSize="small" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    {caseState.quantity.amount}m&sup3;/{t('day')}
                  </Typography>
                </Grid>
                {caseState.quantity.distance !== null ? (
                  <>
                    <Grid item>
                      <ArrowRightAltIcon fontSize="small" color="primary" />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">{caseState.quantity.distance}m</Typography>
                    </Grid>
                  </>
                ) : (
                  <div />
                )}

                {caseState.quantity.heightDifference !== null ? (
                  <>
                    <Grid item>
                      <ArrowUpwardIcon fontSize="small" color="primary" />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">{caseState.quantity.heightDifference}m</Typography>
                    </Grid>
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
