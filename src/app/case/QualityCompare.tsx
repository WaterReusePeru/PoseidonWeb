import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../hooks'
import { useTranslation } from 'react-i18next'
import { Bar } from './Bar'
import { useTheme } from '@mui/material/styles'

import { waterQualities, WaterQuality, waterQualityFactors } from '../data/model'

export default function QualityCompare() {
  const caseState = useAppSelector((state) => state.case)
  const input = useAppSelector((state) => state.case.input)
  const endUse = useAppSelector((state) => state.case.endUse)

  const theme = useTheme()

  const barWidth = 'calc(1/' + caseState.qualityFactors.length + '*80%)'

  const { t } = useTranslation()

  return (
    <>
      <Grid item container xs={12} justifyContent="space-evenly" alignItems="center">
        {input.custom
          ? !endUse.qualityClass && !endUse.customValueEntered
            ? waterQualityFactors.map((f, index) => {
                const key = f.name as keyof WaterQuality

                if (caseState.qualityFactors.includes(f.name)) {
                  return (
                    <div key={index} style={{ width: barWidth }}>
                      <Bar
                        factor={f.name}
                        unit={f.unit}
                        input={
                          input.customValues === undefined
                            ? null
                            : isNaN(Number(input.customValues[key]))
                            ? null
                            : input.customValues[key]
                        }
                        average={waterQualities[0][key]}
                      />
                    </div>
                  )
                } else {
                  return null
                }
              })
            : waterQualityFactors.map((f, index) => {
                const key = f.name as keyof WaterQuality

                if (caseState.qualityFactors.includes(f.name)) {
                  return (
                    <div key={index} style={{ width: barWidth }}>
                      <Bar
                        factor={f.name}
                        unit={f.unit}
                        input={
                          input.customValues === undefined
                            ? null
                            : isNaN(Number(input.customValues[key]))
                            ? null
                            : input.customValues[key]
                        }
                        output={
                          endUse.custom
                            ? endUse.customValues === undefined
                              ? null
                              : isNaN(Number(endUse.customValues[key]))
                              ? null
                              : endUse.customValues[key]
                            : endUse.qualityClass === undefined
                            ? null
                            : isNaN(Number(waterQualities[endUse.qualityClass][key]))
                            ? null
                            : waterQualities[endUse.qualityClass][key]
                        }
                      />
                    </div>
                  )
                } else {
                  return null
                }
              })
          : input.qualityClass && !endUse.qualityClass && !endUse.customValueEntered
          ? waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              if (caseState.qualityFactors.includes(f.name)) {
                return (
                  <div key={index} style={{ width: barWidth }}>
                    <Bar
                      factor={f.name}
                      unit={f.unit}
                      input={
                        input.qualityClass === undefined
                          ? null
                          : isNaN(Number(waterQualities[input.qualityClass][key]))
                          ? null
                          : waterQualities[input.qualityClass][key]
                      }
                      average={waterQualities[0][key]}
                    />
                  </div>
                )
              } else {
                return null
              }
            })
          : waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              if (caseState.qualityFactors.includes(f.name)) {
                return (
                  <div key={index} style={{ width: barWidth }}>
                    <Bar
                      factor={f.name}
                      unit={f.unit}
                      input={
                        input.qualityClass === undefined
                          ? null
                          : isNaN(Number(waterQualities[input.qualityClass][key]))
                          ? null
                          : waterQualities[input.qualityClass][key]
                      }
                      output={
                        endUse.custom
                          ? endUse.customValues === undefined
                            ? null
                            : isNaN(Number(endUse.customValues[key]))
                            ? null
                            : endUse.customValues[key]
                          : endUse.qualityClass === undefined
                          ? null
                          : isNaN(Number(waterQualities[endUse.qualityClass][key]))
                          ? null
                          : waterQualities[endUse.qualityClass][key]
                      }
                    />
                  </div>
                )
              } else {
                return null
              }
            })}
      </Grid>

      <Grid item container xs={12} justifyContent="space-evenly" alignItems="flex-start">
        <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
          <Grid item>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <g>
                <rect width="20" height="20" fill={theme.palette.primary.main}></rect>
              </g>
            </svg>
          </Grid>
          <Grid item>
            <Typography variant="caption">{t('Input')}</Typography>
          </Grid>
        </Grid>

        {endUse.qualityClass === undefined && !endUse.customValueEntered ? (
          <>
            <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
              <Grid item>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <g>
                    <rect width="20" height="20" fill={theme.palette.action.disabled}></rect>
                  </g>
                </svg>
              </Grid>
              <Grid item>
                <Typography variant="caption">{t('Typical untreated domestic wastewater')}</Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
              <Grid item>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <g>
                    <rect width="20" height="20" fill={theme.palette.error.main}></rect>
                  </g>
                </svg>
              </Grid>
              <Grid item>
                <Typography variant="caption">{t('End use, needs treatment')}</Typography>
              </Grid>
            </Grid>

            <Grid item container xs={3} direction="column" alignItems="center" justifyContent="flex-start">
              <Grid item>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <g>
                    <rect width="20" height="20" fill={theme.palette.success.main}></rect>
                  </g>
                </svg>
              </Grid>
              <Grid item>
                <Typography variant="caption">{t('End use, no treatment needed')}</Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}
