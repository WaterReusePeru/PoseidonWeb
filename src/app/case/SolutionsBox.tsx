import { useAppDispatch, useAppSelector } from '../hooks'

import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import Switch from '@mui/material/Switch'

import { useTranslation } from 'react-i18next'
import treatmentTrains from '../data/treatmentTrains.json'
import communityInfo from '../data/communityInfo.json'
import unitProcesses from '../data/unitProcesses.json'
import { waterQualities } from '../data/model'
import Tooltip from '@mui/material/Tooltip'
import CalculateSolutions from '../case/CalculateSolutions'

import { setSolutionsortByRating } from '../case/caseSlice'

import i18next from 'i18next'
import { getLocalisedValue, Language } from '../i18n/languageFunctions'

export default function SolutionsBox() {
  const caseState = useAppSelector((state) => state.case)

  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const lang = i18next.language as Language

  const commInfoState = caseState.commInfo
  const commInfo = communityInfo[caseState.commInfo.countryID!]
  const presetInputQuality = waterQualities[caseState.input.qualityClass!]
  const customInputQuality = caseState.input.customValues
  const presetEndUseQuality = waterQualities[caseState.endUse.qualityClass!]
  const customEndUseQuality = caseState.endUse.customValues
  const quantity = caseState.input.quantity
  const sortByRating = caseState.solution.sortByRating

  CalculateSolutions(
    caseState.input.custom ? customInputQuality : presetInputQuality,
    caseState.endUse.custom ? customEndUseQuality : presetEndUseQuality,
    quantity!,
    sortByRating,
    commInfo,
  ) //TODO: !

  console.log(caseState)

  console.log(caseState.solutions)

  const handleChangePriority = () => {
    dispatch(setSolutionsortByRating(!sortByRating))
  }

  return (
    <Paper elevation={0}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {t('Solutions')} ({caseState.solutions.filter((obj) => obj.treatmentTrain !== undefined).length})
          </Typography>
          <Typography variant="body2">
            {caseState.solution.noneNeeded
              ? t(
                  'Based on your input, no treatment is needed because the input quality is better than the end use quality.',
                )
              : caseState.solution.noneAvailable
                ? t('Based on your input, there is no possible solution.')
                : caseState.solution.noneCalculable
                  ? t('The solution cannot be calculated because there is no input for a defined end use.')
                  : t('Based on your input, the following treatment trains are best suited for the case.')}
          </Typography>
        </Grid>

        {!caseState.solution.noneNeeded && !caseState.solution.noneAvailable && !caseState.solution.noneCalculable ? (
          <Grid item container xs={12} spacing={1} alignItems="center">
            {!isNaN(caseState.solutions[0].capex!) ? (
              <Grid item container alignItems="center" spacing={1} xs={12} justifyContent="space-between">
                <Grid item>
                  <Typography variant="body2">{t('Sort by rating')}</Typography>
                </Grid>
                <Grid item>
                  <Switch color="primary" checked={sortByRating} onChange={(event) => handleChangePriority()} />
                </Grid>
              </Grid>
            ) : null}

            {caseState.solutions.slice(0, 3).map((solution, index) => {
              if (solution.treatmentTrain || solution.treatmentTrain === 0) {
                return (
                  <Grid item container key={index} spacing={1}>
                    <Grid item container justifyContent="flex-start" spacing={1} xs={12}>
                      <Grid item>
                        <Chip label={index + 1} color="secondary" size="small" />
                      </Grid>
                      <Grid item>
                        <Typography>
                          {getLocalisedValue(treatmentTrains[solution.treatmentTrain!], lang, 'category')}
                          {/* TODO: ! */}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{t('Case Study')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {getLocalisedValue(treatmentTrains[solution.treatmentTrain!], lang, 'title')}
                      </Typography>
                      {/* TODO: ! */}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{t('Rating')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{Math.round(solution.rating! * 100) / 100}</Typography>{' '}
                      {/* TODO: ! */}
                    </Grid>
                    {!isNaN(solution.capexPerCubic!) ? ( //TODO: !
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2">{t('Treatment Cost')}:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {commInfoState.currency === 0 ? (
                              <>{solution.costPerCubic!.toLocaleString('de-CH')} $</>
                            ) : (
                              <>
                                {(
                                  communityInfo[commInfoState.countryID].exchangeToUSD * solution.costPerCubic!
                                ).toPrecision(3)}{' '}
                                {communityInfo[commInfoState.countryID].currency + '/'}m&sup3;
                              </>
                            )}
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <div />
                    )}
                    <Grid item xs={6}>
                      <Typography variant="body2">{t('Unit Processes')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {treatmentTrains[solution.treatmentTrain!].unit_processes.map(
                        (
                          up,
                          index, //TODO: !
                        ) => (
                          <Tooltip key={index} title={getLocalisedValue(unitProcesses[up], lang, 'name')}>
                            <Chip label={up} key={index} size="small" color="primary" style={{ margin: 2 }} />
                          </Tooltip>
                        ),
                      )}
                    </Grid>
                  </Grid>
                )
              } else {
                return null
              }
            })}
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </Paper>
  )
}
