import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'

import { useTranslation } from 'react-i18next'
import treatmentTrains from '../data/treatmentTrains.json'
import communityInfo from '../data/communityInfo.json'
import unitProcesses from '../data/unitProcesses.json'
import waterQualities from '../data/waterQualities'
import Tooltip from '@material-ui/core/Tooltip'
import CalculateSolutions from '../case/CalculateSolutions'

import { setSolutionSortByCost } from '../case/caseSlice'

import i18next from 'i18next'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    padding: 10
  }
}))

export default function SolutionsBox() {
  const classes = useStyles()

  const caseState = useSelector(state => state.case)

  const dispatch = useDispatch()

  const { t } = useTranslation()
  const lang = i18next.language

  const commInfo = caseState.commInfo
  const inputQuality = waterQualities[caseState.inputQuality.qualityClass]
  const endUseQuality = waterQualities[caseState.endUse.qualityClass]
  const amount = caseState.quantity.amount
  const sortByCost = caseState.solution.sortByCost

  CalculateSolutions(commInfo, inputQuality, endUseQuality, amount, sortByCost)

  const handleChangePriority = value => {
    dispatch(setSolutionSortByCost(!sortByCost))
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">{t('Solutions')}</Typography>
          <Typography variant="caption">
            {caseState.solution.noneNeeded
              ? t(
                  'Based on your input, no treatment is needed because the input quality is better than the end use quality.'
                )
              : caseState.solution.noneAvailable
              ? t('Based on your input, theres no possible solution')
              : t('Based on your input, the following treatment trains are best suited for the case.')}
          </Typography>
        </Grid>

        {!caseState.solution.noneNeeded & !caseState.solution.noneAvailable ? (
          <Grid item container xs={12} spacing={1} alignItems="center">

            {caseState.solutions[0].capex !== 0 ?
            <Grid item container alignItems="center" spacing={1} xs={12} justifyContent="space-between">
              <Grid item>
                <Typography>{t('Sort by cost')}</Typography>
              </Grid>
              <Grid item>
                <Switch color="primary" checked={sortByCost} onChange={event => handleChangePriority(event)} />
              </Grid>
            </Grid> : null }

            {caseState.solutions.map((solution, index) => (
              <>
                <Grid item container justifyContent="flex-start" spacing={1} xs={12}>
                  <Grid item>
                    <Chip label={index + 1} color="secondary" size="small" />
                  </Grid>
                  <Grid item>
                    <Typography>
                      {lang === 'en'
                        ? treatmentTrains[solution.treatmentTrain].category
                        : treatmentTrains[solution.treatmentTrain].categoryEs}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{t('Case Study')}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{treatmentTrains[solution.treatmentTrain].title}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{t('Rating')}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{Math.round(((solution.rating * 10) / 3) * 1000) / 1000}</Typography>
                </Grid>
                {!isNaN(solution.annualizedCapexPerCubic) ? (
                  <>
                    <Grid item xs={6}>
                      <Typography>{t('Yearly Capital Expenditures')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {commInfo.currency === 0 ? (
                          <>{Math.round(solution.annualizedCapexPerCubic * 1000).toLocaleString('de-CH')} $/m&sup3;</>
                        ) : (
                          <>
                            {(
                              communityInfo[commInfo.countryID].exchangeToUSD *
                              Math.round(solution.annualizedCapexPerCubic * 1000)
                            ).toLocaleString('de-CH')}{' '}
                            {communityInfo[commInfo.countryID].currency}/m&sup3;
                          </>
                        )}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <div />
                )}
                <Grid item xs={6}>
                  <Typography>{t('Unit Processes')}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  {treatmentTrains[solution.treatmentTrain].unit_processes.map((up, index) => (
                    <Tooltip key={index} title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
                      <Chip label={up} key={index} size="small" color="primary" style={{ margin: 2 }} />
                    </Tooltip>
                  ))}
                </Grid>
              </>
            ))}
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </Paper>
  )
}
