import makeStyles from '@mui/styles/makeStyles'

import { Theme, StyledEngineProvider } from '@mui/material/styles'
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
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

  function showCost(v: number) {
    return commInfo.currency === 0 ? (
      <>{Math.round(v * 1000).toLocaleString('de-CH')} $</>
    ) : (
      <>
        {(communityInfo[commInfo.countryID].exchangeToUSD * Math.round(v * 1000)).toLocaleString('de-CH')}{' '}
        {communityInfo[commInfo.countryID].currency}
      </>
    )
  }

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
      sort: false,
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
        setCellProps: () => ({ style: { minWidth: '10vw' } }),
      },
    },

    {
      name: 'rating',
      label: t('Rating [0-3]'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return Math.round(data[dataIndex].rating! * 100) / 100
        },
      },
    },
    {
      name: 'landRequirements',
      label: t('Land Requirements'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return Math.round(data[dataIndex].landRequirements! * 100) / 100 + ' ha'
        },
        display: false,
      },
    },
    {
      name: 'annualizedLandCost',
      label: t('Annualized Land Cost'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return showCost(data[dataIndex].annualizedLandCost!)
        },
      },
    },
    {
      name: 'energyRequirements',
      label: t('Energy Requirements'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return Math.round(data[dataIndex].energyRequirements! * 100) / 100 + ' kWh/y'
        },
        display: false,
      },
    },
    {
      name: 'annualizedEnergyCost',
      label: t('Annualized Energy Cost'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return showCost(data[dataIndex].annualizedEnergyCost!)
        },
      },
    },
    {
      name: 'laborRequirements',
      label: t('Labor Requirements'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return Math.round(data[dataIndex].laborRequirements! * 100) / 100 + ' person-hour/month'
        },
        display: false,
      },
    },
    {
      name: 'annualizedLaborCost',
      label: t('Annualized Labor Cost'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return showCost(data[dataIndex].annualizedLaborCost!)
        },
      },
    },
    {
      name: 'otherOM',
      label: t('Other Operations & Maintenance Cost'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return showCost(data[dataIndex].otherOM!)
        },
        display: false,
      },
    },
    {
      name: 'OPEX',
      label: t('Annualized OPEX'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return showCost(
            data[dataIndex].annualizedOMCost! +
              data[dataIndex].annualizedEnergyCost! +
              data[dataIndex].annualizedLaborCost! +
              data[dataIndex].annualizedLandCost!
          )
        },
        display: true,
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
      name: 'capexPerCubic',
      label: t('CAPEX per Cubic'),
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex: number) => {
          return commInfo.currency === 0 ? (
            <>{(Math.round(data[dataIndex].capexPerCubic! * 100000) / 100).toLocaleString('de-CH')} $</>
          ) : (
            <>
              {(
                (Math.round(data[dataIndex].capexPerCubic! * 100000) / 100) *
                communityInfo[commInfo.countryID].exchangeToUSD
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
      <StyledEngineProvider injectFirst>
        <MUIDataTable title={t('Results')} data={data} columns={columns} options={options} />
      </StyledEngineProvider>
    </div>
  )
}
