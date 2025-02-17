import { StyledEngineProvider, Theme } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import { WaterQuality, waterQualityFactors } from '../data/model'

import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Language, getFieldKey, getLocalisedValue } from '../i18n/languageFunctions'

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

export default function WaterQualities() {
  const classes = useStyles()

  const { t } = useTranslation()

  const data = waterQualities
  const categories = waterQualityCategories

  const lang = i18next.language as Language

  var nameCol = getFieldKey('name', lang)
  var noteCol = getFieldKey('note', lang)
  var referenceCol = getFieldKey('reference', lang)
  var tagsCol = getFieldKey('tags', lang)

  const dataGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
    },
    {
      field: 'category',
      headerName: t('Category'),
      minWidth: 150,
      valueGetter: (value: number) => {
        return getLocalisedValue(categories[value], lang, 'name')
      },
    },
    {
      field: nameCol,
      minWidth: 150,
      headerName: t('Name'),
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
      field: 'wqi',
      headerName: t('Water Quality Indicators'),
      minWidth: 300,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const rowId = params.id as number

        return (
          <div className={classes.chipContainer}>
            {waterQualityFactors.map((f, index) => {
              const key = f.name as keyof WaterQuality

              return (
                <Tooltip
                  key={index}
                  title={getLocalisedValue(waterQualityFactors[index], lang, 'nameLong') + ' [' + waterQualityFactors[index].unit + ']'}
                >
                  <Chip label={data[rowId][key] !== null ? data[rowId][key] : '-'} key={index} size="small" />
                </Tooltip>
              )
            })}
          </div>
        )
        // return null
      },
    },
    {
      field: noteCol,
      headerName: t('Note'),
      minWidth: 300,
      flex: 1,
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
      field: referenceCol,
      headerName: t('Reference'),
      minWidth: 150,
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
      field: tagsCol,
      headerName: t('Tags'),
    },
    {
      field: 'type',
      headerName: t('Type'),
      minWidth: 150,
      renderCell: (params: any) => {
        if (categories[data[params.id].category].input) {
          return t('Wastewater')
        } else {
          return t('Quality Standard')
        }
      },
    },
  ]

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Typography variant="h6">{t('Water Qualities')}</Typography>
        <DataGrid rows={data} columns={dataGridColumns} rowHeight={120} classes={{ cell: classes.dataGridCell }} />
      </StyledEngineProvider>
    </>
  )
}
