import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 50
  },
  root: {
    flexGrow: 1,
    paddingTop: 60
  }
}))

export default function GeneralReference() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.main}>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Typography variant="h6">{t('General Reference')}</Typography>
        <Typography>
          {t(
            'This Poseidon – Web on-line application is an update of the already existing developed Poseidon application based on Microsoft Excel. The scope of the new application is to enhance the older version to a more user-friendly decision support tool, that supports pre-feasibility studies and aims at promoting water reuse and building capacities in the field. The tool developed currently encompasses 37-unit processes combined into 70 benchmark treatment trains. It also contains information on water quality standards and typical wastewater qualities. It estimates the removal performances for 12 parameters and the lifecycle costs including distribution.'
          )}
        </Typography>
        <Typography>
          {t(
            'The tool and all underlying data are open access and under continuous development. The underlying systemic approach of the tool makes it intuitive also for users with limited prior knowledge in the field to identify most adequate solutions based on a multi-criteria assessment. This should help to promote water reuse and spearhead initiates for more detailed feasibility and design commissioning for implementation of water reuse schemes.'
          )}
        </Typography>
      </Paper>
    </div>
  )
}
