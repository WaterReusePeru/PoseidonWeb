import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../hooks'
import { useTranslation } from 'react-i18next'
import { Bar } from './Bar'
import { useTheme } from '@mui/material/styles'

import { waterQualities, WaterQuality, waterQualityFactors } from '../data/model'

export default function QualityCompare() {
  const endUse = useAppSelector((state) => state.case.endUse)
  const input = useAppSelector((state) => state.case.input)

  const theme = useTheme()

  const { t } = useTranslation()

  return (
    <>
      <Grid item container xs={12} justifyContent="space-evenly" alignItems="center">
        {input.qualityClass !== undefined && endUse.qualityClass === undefined
          ? waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              return (
                <div key={index} style={{ width: 'calc(1/6*80%' }}>
                  <Bar
                    factor={f.name}
                    unit={f.unit}
                    input={
                      input.qualityClass === undefined
                        ? null
                        : waterQualities[input.qualityClass][key] < 0
                        ? null
                        : waterQualities[input.qualityClass][key]
                    }
                    average={waterQualities[0][key]}
                  />
                </div>
              )
            })
          : waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              return (
                <div key={index} style={{ width: 'calc(1/6*80%' }}>
                  <Bar
                    factor={f.name}
                    unit={f.unit}
                    input={
                      input.qualityClass === undefined
                        ? null
                        : waterQualities[input.qualityClass][key] < 0
                        ? null
                        : waterQualities[input.qualityClass][key]
                    }
                    output={
                      endUse.qualityClass === undefined
                        ? null
                        : waterQualities[endUse.qualityClass][key] < 0
                        ? null
                        : waterQualities[endUse.qualityClass][key]
                    }
                  />
                </div>
              )
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

        {endUse.qualityClass === undefined ? (
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
