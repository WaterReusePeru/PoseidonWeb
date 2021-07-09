import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import communityInfo from '../data/communityInfo'
import waterQualities from '../data/waterQualities.json'

export const CaseSummary = props => {
  const { step } = props

  const caseState = useSelector(state => state.case)

  const { t } = useTranslation()
  const lang = i18next.language

  return (
    <Grid item container spacing={1} alignItems="flex-start">
      {step === 0 ? (
        <>
          <Grid item>
            {caseState.commInfo.countryID !== null ? (
              <Typography variant="caption">
                {lang === 'en'
                  ? communityInfo[caseState.commInfo.countryID].name
                  : communityInfo[caseState.commInfo.countryID].nameEs}
              </Typography>
            ) : (
              <div />
            )}
            {caseState.commInfo.currency !== null ? (
              <Typography variant="caption">
                : {caseState.commInfo.currency === 0 ? 'USD' : communityInfo[caseState.commInfo.countryID].currency}
              </Typography>
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
            <Typography variant="caption">
              {lang === 'en'
                ? waterQualities[caseState.inputQuality.qualityClass].name
                : waterQualities[caseState.inputQuality.qualityClass].nameEs}
            </Typography>
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
            <Typography variant="caption">
              {lang === 'en'
                ? waterQualities[caseState.endUse.qualityClass].name
                : waterQualities[caseState.endUse.qualityClass].nameEs}
            </Typography>
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
            <Typography variant="caption">
              {caseState.quantity.amount}m&sup3;/{t('day')}
            </Typography>
          ) : (
            <div />
          )}
        </Grid>
      ) : (
        <div />
      )}
    </Grid>
  )
}
