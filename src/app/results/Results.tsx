import makeStyles from '@mui/styles/makeStyles'

import Paper from '@mui/material/Paper'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles'
import MUIDataTable from 'mui-datatables'
import { options } from '../theme/tables'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import { useAppSelector } from '../hooks'

import treatmentTrains from '../data/treatmentTrains.json'
import unitProcesses from '../data/unitProcesses.json'
import communityInfo from '../data/communityInfo.json'

import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { theme } from '../theme/theme'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    paddingTop: 110,
  },
  root: {
    flexGrow: 1,
    paddingTop: 120,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2,
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const Results = () => {
  const classes = useStyles()

  const { t } = useTranslation()

  const lang = i18next.language

  const solutionsState = useAppSelector((state) => state.case.solutions)
  const solutionsCount = useAppSelector((state) => state.case.solution.count)
  const commInfo = useAppSelector((state) => state.case.commInfo)

  const columns = [
    {
      name: 'Ranking',
      label: t('Ranking'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return dataIndex + 1
        },
      },
    },
    {
      name: 'treatmentTrain',
      label: t('Treatment Train'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return lang === 'en'
            ? treatmentTrains[data[dataIndex].treatmentTrain!].category +
                ' - ' +
                treatmentTrains[data[dataIndex].treatmentTrain!].title
            : treatmentTrains[data[dataIndex].treatmentTrain!].categoryEs +
                ' - ' +
                treatmentTrains[data[dataIndex].treatmentTrain!].titleEs
        },
      },
    },
    {
      name: 'unitProcesses',
      label: t('Unit Processes'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return (
            <div className={classes.chipContainer}>
              {treatmentTrains[data[dataIndex].treatmentTrain!].unit_processes.map((up, index) => {
                return (
                  <Tooltip title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
                    <Chip
                      label={up}
                      key={index}
                      size="small"
                      color="primary"
                      style={{ margin: 2 }}
                      className={classes.chip}
                    />
                  </Tooltip>
                )
              })}
            </div>
          )
        },
        setCellProps: () => ({ style: { minWidth: '15vw' } }),
      },
    },

    {
      name: 'rating',
      label: t('Rating [1-10]'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return Math.round(data[dataIndex].rating! * 1000) / 1000
        },
      },
    },
    {
      name: 'capex',
      label: t('Total capital expenditure (CAPEX)'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return commInfo.currency === 0 ? (
            <>{Math.round(data[dataIndex].capex! * 1000).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                communityInfo[commInfo.countryID].exchangeToUSD * Math.round(data[dataIndex].capex! * 1000)
              ).toLocaleString('de-CH')}{' '}
              {communityInfo[commInfo.countryID].currency}
            </>
          )
        },
      },
    },
    {
      name: 'annualizedCapex',
      label: t('Annualized CAPEX'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return commInfo.currency === 0 ? (
            <>{Math.round(data[dataIndex].annualizedCapex! * 1000).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                communityInfo[commInfo.countryID].exchangeToUSD * Math.round(data[dataIndex].annualizedCapex! * 1000)
              ).toLocaleString('de-CH')}{' '}
              {communityInfo[commInfo.countryID].currency}
            </>
          )
        },
      },
    },
    {
      name: 'annualizedCapexPerCubic',
      label: t('Annualized CAPEX per Cubic'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return commInfo.currency === 0 ? (
            <>{Math.round(data[dataIndex].annualizedCapexPerCubic! * 1000).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                communityInfo[commInfo.countryID].exchangeToUSD *
                Math.round(data[dataIndex].annualizedCapexPerCubic! * 1000)
              ).toLocaleString('de-CH')}{' '}
              {communityInfo[commInfo.countryID].currency}
            </>
          )
        },
      },
    },
  ]

  const data = solutionsState.slice(0, solutionsCount)

  return (
    <div className="App">
      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <MUIDataTable title={t('Results')} data={data} columns={columns} options={options} />
            </ThemeProvider>
          </StyledEngineProvider>
        </Paper>
      </div>
    </div>
  )
}
