import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Calculations from '../images/Calculations.png'
import Grid from '@mui/material/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 60,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

export default function GeneralReference() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container direction="row" alignItems="flex-start" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">{t('General Reference')}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          {t(
            'This Poseidon – Web on-line application is an update of the already existing developed Poseidon application based on Microsoft Excel. The scope of the new application is to enhance the older version to a more user-friendly decision support tool, that supports pre-feasibility studies and aims at promoting water reuse and building capacities in the field. The tool developed currently encompasses >40-unit processes combined into >60 benchmark treatment trains. It also contains information on water quality standards and typical wastewater qualities. It estimates the removal performances for key parameters and the lifecycle costs of the additional treatment train.'
          )}
        </Typography>
        <Typography>
          {t(
            'The tool and all underlying data are open access and under continuous development. The underlying systemic approach of the tool makes it intuitive also for users with limited prior knowledge in the field to identify most adequate solutions based on a multi-criteria assessment. This should help to promote water reuse and spearhead initiates for more detailed feasibility and design commissioning for implementation of water reuse schemes.'
          )}
        </Typography>
        <Typography>
          {t(
            'The figure on the right shows a simplified flow of how the application works and how the calculations are being made.'
          )}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <img className={classes.img} src={Calculations} alt={t('Overview of application and calculations')} />
      </Grid>
    </Grid>
  )
}
