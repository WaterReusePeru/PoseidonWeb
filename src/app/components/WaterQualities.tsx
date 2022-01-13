import MUIDataTable from 'mui-datatables'
import { MUIDataTableOptions } from 'mui-datatables'
import { makeStyles, MuiThemeProvider, Theme, createTheme } from '@material-ui/core/styles'

import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import { WaterQuality, waterQualityFactors } from '../data/model'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

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
}))

export default function UnitProcesses() {
  const muiTheme = createTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
  })

  const classes = useStyles()

  const { t } = useTranslation()

  const data = waterQualities
  const qualities = waterQualityCategories

  const lang = i18next.language

  var nameCol = lang === 'en' ? 'name' : 'nameEs'
  var noteCol = lang === 'en' ? 'note' : 'noteEs'
  var referenceCol = lang === 'en' ? 'reference' : 'referenceEs'

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
      },
    },
    {
      name: 'category',
      label: t('Category'),
      options: {
        filter: true,
        customBodyRender: (value: number) => {
          return <div>{lang === 'en' ? qualities[value].name : qualities[value].nameEs}</div>
        },
      },
    },
    {
      name: nameCol,
      label: t('Name'),
      options: {
        filter: true,
      },
    },
    {
      name: 'wqi',
      label: t('Water Quality Indicators'),
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {
          const columnTitles = [t('Turbidity'), 'TSS', 'BOD', 'COD', 'FC', 'TC']

          return (
            <div className={classes.chipContainer}>
              {waterQualityFactors.map((f, index) => {
                const key = f.name as keyof WaterQuality

                return (
                  <Tooltip key={index} title={columnTitles[index]}>
                    <Chip label={data[dataIndex][key] !== -1 ? data[dataIndex][key] : '-'} key={index} size="small" />
                  </Tooltip>
                )
              })}
            </div>
          )
        },
        setCellProps: () => ({ style: { minWidth: '20vw' } }),
      },
    },
    {
      name: noteCol,
      label: t('Note'),
      options: {
        filter: true,
      },
    },
    {
      name: referenceCol,
      label: t('Reference'),
      options: {
        filter: true,
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filter: true,
    filterType: 'dropdown',
    selectableRows: 'none',
    rowsPerPage: 15,
    print: false,
    //textLabels: {textLabels}
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <MUIDataTable title={t('Water Qualities')} data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  )
}
