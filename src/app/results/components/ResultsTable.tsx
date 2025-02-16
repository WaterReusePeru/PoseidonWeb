import makeStyles from '@mui/styles/makeStyles'

import { Theme, StyledEngineProvider } from '@mui/material/styles'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import treatmentTrains from '../../data/treatmentTrains.json'
import unitProcesses from '../../data/unitProcesses.json'

import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { communityInfos, waterQualityFactors } from '../../data/model'
import { useAppSelector } from '../../hooks'
import { CustomToolbar } from './CustomToolbar'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

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
  dataGridCell: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    textAlign: 'center',
  },
}))

export const ResultsTable = (/* {solutionsState, commInfoState}: ResultsTableProps */) => {
  const classes = useStyles()

  const { t } = useTranslation()

  const lang = i18next.language

  const solutionsState = useAppSelector((state) => state.case.solutions)
  const commInfoState = useAppSelector((state) => state.case.commInfo)

  function showCost(v: number) {
    // Convert to the correct currency
    const convertedValue = commInfoState.currency === 0 ? v : communityInfos[commInfoState.countryID].exchangeToUSD * v

    // Format with 3 significant figures
    const formattedValue = Number(convertedValue.toPrecision(3)).toLocaleString('de-CH')

    return (
      <>
        {formattedValue} {commInfoState.currency === 0 ? '$' : communityInfos[commInfoState.countryID].currency}
      </>
    )
  }

  const dataGridColumns: GridColDef[] = [
    {
      field: 'ranking',
      headerName: t('Ranking'),
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return rowId + 1
      },
    },
    {
      field: 'treatmentTrain',
      headerName: t('Treatment Train'),
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return lang === 'en'
          ? treatmentTrains[data[rowId].treatmentTrain!].category +
              ' - ' +
              treatmentTrains[data[rowId].treatmentTrain!].title
          : treatmentTrains[data[rowId].treatmentTrain!].categoryEs +
              ' - ' +
              treatmentTrains[data[rowId].treatmentTrain!].titleEs
      },
    },
    {
      field: 'unitProcesses',
      headerName: t('Unit Processes'),
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {treatmentTrains[data[rowId].treatmentTrain!].unit_processes.map((up, index) => {
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
    },
    {
      field: 'values',
      headerName: t('Output Values'),
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {Object.entries(data[rowId].values).map(([key, value]: [string, number]) => {
              const quality = waterQualityFactors.find((wq) => wq.name === key)
              return (
                <Tooltip title={quality ? (lang === 'en' ? quality.nameLong : quality.nameLongEs) : key}>
                  <Chip
                    label={Number(value.toPrecision(2))}
                    key={key}
                    size="small"
                    //color="primary"
                    style={{ margin: 2 }}
                    //className={classes.chip}
                  />
                </Tooltip>
              )
            })}
          </div>
        )
      },
    },
    {
      field: 'rating',
      headerName: t('Rating [0-3]'),
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return Math.round(data[rowId].rating! * 100) / 100
      },
    },
    {
      field: 'landRequirements',
      headerName: t('Land Requirements'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return Math.round(data[rowId].landRequirements! * 100) / 100 + ' ha'
      },
    },
    {
      field: 'annualizedLandCost',
      headerName: t('Annualized Land Cost'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedLandCost!)
      },
    },
    {
      field: 'energyRequirements',
      headerName: t('Energy Requirements'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return Number(data[rowId].energyRequirements!.toPrecision(3)) + ' ' + t('kWh/y')
      },
    },
    {
      field: 'annualizedEnergyCost',
      headerName: t('Annualized Energy Cost'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedEnergyCost!)
      },
    },
    {
      field: 'laborRequirements',
      headerName: t('Labor Requirements'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return Number(data[rowId].laborRequirements!.toPrecision(3)) + ' ' + t('p-h/mo')
      },
    },
    {
      field: 'annualizedLaborCost',
      headerName: t('Annualized Labor Cost'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedLaborCost!)
      },
    },
    {
      field: 'annualizedOMCost',
      headerName: t('Annualized Other O&M Cost'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedOMCost!)
      },
    },
    {
      field: 'annualizedOpex',
      headerName: t('Annualized OPEX'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedOpex!)
      },
    },
    {
      field: 'capex',
      headerName: t('Total capital expenditure (CAPEX)'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].capex!)
      },
    },
    {
      field: 'annualizedCapex',
      headerName: t('Annualized CAPEX'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedCapex!)
      },
    },
    {
      field: 'annualizedCost',
      headerName: t('Annualized Total Cost'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return showCost(data[rowId].annualizedCapex! + data[rowId].annualizedOpex!)
      },
    },
    {
      field: 'costPerCubic',
      headerName: t('Cost per Cubic'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return commInfoState.currency === 0 ? (
          <>{data[rowId].costPerCubic!.toLocaleString('de-CH')} $</>
        ) : (
          <>
            {(communityInfos[commInfoState.countryID].exchangeToUSD * data[rowId].costPerCubic!).toPrecision(3)}{' '}
            {communityInfos[commInfoState.countryID].currency}
          </>
        )
      },
    },
  ]

  const data = solutionsState.filter((solution) => {
    if (Object.keys(solution).length !== 0 && solution.treatmentTrain !== undefined) {
      return true
    }
    return false
  })

  const processedData = data.map((row, index) => ({ ...row, id: index }))

  return (
    <StyledEngineProvider injectFirst>
      <div style={{ textAlign: 'right' }}>
        <CustomToolbar />
      </div>
      <DataGrid
        rows={processedData}
        columns={dataGridColumns}
        rowHeight={90}
        classes={{ cell: classes.dataGridCell }}
        getRowId={(row) => row.id}
      />
    </StyledEngineProvider>
  )
}
