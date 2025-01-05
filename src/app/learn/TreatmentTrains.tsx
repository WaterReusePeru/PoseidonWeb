import { StyledEngineProvider, Theme } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

import { unitProcesses, treatmentTrains } from '../data/model'

import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

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

export default function TreatmentTrains() {
  const classes = useStyles()

  const { t } = useTranslation()

  const data = treatmentTrains

  const lang = i18next.language

  var categoryCol = lang === 'en' ? 'category' : 'categoryEs'
  var titleCol = lang === 'en' ? 'title' : 'titleEs'
  var descriptionCol = lang === 'en' ? 'description' : 'descriptionEs'
  var caseStudyCol = lang === 'en' ? 'case_study' : 'case_studyEs'

  const dataGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
    },
    {
      field: categoryCol,
      headerName: t('Category'),
      minWidth: 200,
    },
    {
      field: titleCol,
      headerName: t('Title'),
      minWidth: 150,
    },
    {
      field: descriptionCol,
      headerName: t('Description'),
      minWidth: 300,
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            whiteSpace: 'normal',
            lineHeight: 1.5,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: caseStudyCol,
      headerName: t('Case Study'),
      minWidth: 300,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            whiteSpace: 'normal',
            lineHeight: 1.5,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'recovery',
      headerName: t('Recovery') + ' [%]',
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        const UPList = data[rowId].unit_processes

        return (
          <div className={classes.chipContainer}>
            {UPList &&
              UPList.map((up, index) => (
                <Tooltip key={index} title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
                  <Chip label={up} key={index} size="small" color="primary" className={classes.chip} />
                </Tooltip>
              ))}
          </div>
        )
      },
    },
  ]

  return (
    <StyledEngineProvider injectFirst>
      <Typography variant="h6">{t('Treatment Trains')}</Typography>
      <DataGrid rows={data} columns={dataGridColumns} rowHeight={150} classes={{ cell: classes.dataGridCell }} />
    </StyledEngineProvider>
  )
}
