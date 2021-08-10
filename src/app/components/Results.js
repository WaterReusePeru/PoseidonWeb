import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import { useSelector } from 'react-redux'

import treatmentTrains from '../data/treatmentTrains.json'
import unitProcesses from '../data/unitProcesses.json'
import communityInfo from '../data/communityInfo.json'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

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
    paddingTop: 110
  },
  root: {
    flexGrow: 1,
    paddingTop: 120
  }
}))

/* const styles = theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
}) */

export const Results = () => {
  const getMuiTheme = theme => ({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: 'none'
        }
      }
    }
  })

  const classes = useStyles()

  const { t } = useTranslation()

  const lang = i18next.language

  const solutionsState = useSelector(state => state.case.solutions)
  const commInfo = useSelector(state => state.case.commInfo)

  const columns = [
    {
      name: 'Ranking',
      label: t('Ranking'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return dataIndex + 1
        }
      }
    },
    {
      name: 'treatmentTrain',
      label: t('Treatment Train'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return lang === 'en'
            ? treatmentTrains[data[dataIndex].treatmentTrain].category +
                ' - ' +
                treatmentTrains[data[dataIndex].treatmentTrain].title
            : treatmentTrains[data[dataIndex].treatmentTrain].categoryEs +
                ' - ' +
                treatmentTrains[data[dataIndex].treatmentTrain].titleEs
        }
      }
    },
    {
      name: 'unitProcesses',
      label: t('Unit Processes'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return treatmentTrains[data[dataIndex].treatmentTrain].unit_processes.map((up, index) => (
            <Tooltip title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
              <Chip label={up} key={index} size="small" color="primary" style={{ margin: 2 }} />
            </Tooltip>
          ))
        }
      }
    },

    {
      name: 'rating',
      label: t('Rating [1-10]'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return Math.round(((data[dataIndex].rating * 10) / 3) * 1000) / 1000
        }
      }
    },
    {
      name: 'capex',
      label: t('Total capital expenditure (CAPEX)'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return commInfo.currency === 0 ? (
            <>{Math.round(data[dataIndex].capex * 1000).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                communityInfo[commInfo.countryID].exchangeToUSD * Math.round(data[dataIndex].capex * 1000)
              ).toLocaleString('de-CH')}{' '}
              {communityInfo[commInfo.countryID].currency}
            </>
          )
        }
      }
    },
    {
      name: 'annualizedCapex',
      label: t('Annualized CAPEX'),
      options: {
        filter: true,
        customBodyRenderLite: dataIndex => {
          return commInfo.currency === 0 ? (
            <>{Math.round(data[dataIndex].annualizedCapex * 1000).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                communityInfo[commInfo.countryID].exchangeToUSD * Math.round(data[dataIndex].annualizedCapex * 1000)
              ).toLocaleString('de-CH')}{' '}
              {communityInfo[commInfo.countryID].currency}
            </>
          )
        }
      }
    }
  ]

  const data = solutionsState

  console.log(data)

  const options = {
    filter: true,
    filterType: 'dropdown',
    selectableRows: 'none',
    rowsPerPage: 20,
    print: false,
    fixedHeader: true
  }

  return (
    <div className="App">
      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable title={t('Results')} data={data} columns={columns} options={options} />
          </MuiThemeProvider>
        </Paper>
      </div>
    </div>
  )
}
