import { StyledEngineProvider, Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Language, getFieldKey, getLocalisedValue } from '../i18n/languageFunctions'
import { evaluationCriteria, UnitProcess, unitProcesses, waterQualityFactors, costComponents } from '../data/model'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Typography } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
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

export default function UnitProcesses() {
  const classes = useStyles()

  const { t } = useTranslation()

  const data = unitProcesses
  const lang = i18next.language as Language

  var nameCol = getFieldKey('name', lang)

  const dataGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
    },
    {
      field: nameCol,
      headerName: t('Name'),
      minWidth: 250,
    },
    {
      field: 'pre',
      headerName: t('Average Pollutant Removal Efficiencies [% removal]'),
      minWidth: 300,
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {waterQualityFactors.map((f, index) => {
              const key = f.name as keyof UnitProcess

              return (
                <Tooltip
                  key={index}
                  title={getLocalisedValue(waterQualityFactors[index], lang, 'nameLong')}
                >
                  <Chip label={data[rowId][key]} key={index} size="small" />
                </Tooltip>
              )
            })}
          </div>
        )
      },
    },
    {
      field: 'coefficients',
      headerName: t('Regression Coefficients'),
      minWidth: 300,
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {costComponents.map((c, index) => {
              const bKey = (c.name + '_b') as keyof UnitProcess
              const cKey = (c.name + '_c') as keyof UnitProcess
              console.log(data[rowId])

              return (
                <>
                  <Tooltip
                    title={getLocalisedValue(costComponents[index], lang, 'nameLong') + ' (B)'}
                  >
                    <Chip label={typeof data[rowId][bKey] === 'number' ? Number(data[rowId][bKey].toPrecision(3)) : data[rowId][bKey]} size="small" />
                  </Tooltip>
                  <Tooltip
                    title={getLocalisedValue(costComponents[index], lang, 'nameLong') + ' (C)'}
                  >
                    <Chip label={typeof data[rowId][cKey] === 'number' ? Number(data[rowId][cKey].toPrecision(3)) : data[rowId][cKey]} size="small" />
                  </Tooltip>
                </>
              )
            })}
          </div>
        )
      },
    },
    {
      field: 'recovery',
      headerName: t('Recovery') + ' [%]',
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            <Chip label={data[rowId].recovery} size="small" />
          </div>
        )
      },
    },
    {
      field: 'evaluationCriteria',
      headerName: t('Evaluation Criteria') + ' [0-3]',
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {evaluationCriteria.map((c, index) => {
              const key = c.name as keyof UnitProcess
              const value = data[rowId][key] as number

              return (
                <Tooltip
                  key={index}
                  title={getLocalisedValue(evaluationCriteria[index], lang, 'nameLong')}
                >
                  <Chip
                    label={value}
                    key={index}
                    size="small"
                    color="primary"
                    className={classes.chip}
                    style={{ opacity: 0.25 + value / 4 }}
                  />
                </Tooltip>
              )
            })}
          </div>
        )
      },
    },
    {
      field: 'usefulLife',
      headerName: t('Useful Life [yrs]'),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            <Chip label={data[rowId].useful_life} size="small" />
          </div>
        )
      },
    },
  ]

  return (
    <StyledEngineProvider injectFirst>
      <Typography variant="h6">{t('Unit Processes')}</Typography>
      <DataGrid rows={data} columns={dataGridColumns} rowHeight={90} classes={{ cell: classes.dataGridCell }} />
    </StyledEngineProvider>
  )
}
