import MUIDataTable from 'mui-datatables'
import { MUIDataTableOptions } from 'mui-datatables'
import { makeStyles, MuiThemeProvider, Theme, createTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { evaluationCriteria, UnitProcess, unitProcesses, waterQualityFactors } from '../data/model'

const useStyles = makeStyles((theme: Theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  },
  chip: {
    backgroundColor: theme.palette.primary.main
  }
}))

export default function UnitProcesses() {
  const muiTheme = createTheme({
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

  const data = unitProcesses
  const lang = i18next.language

  var nameCol = lang === 'en' ? 'name' : 'nameEs'

  const columns = [
    {
      name: 'id',
      options: {
        filter: true
      }
    },
    {
      name: nameCol,
      label: t('Name'),
      options: {
        filter: true
      }
    },
    {
      name: 'pre',
      label: t('Pollutant Removal Efficiencies [% removal]'),
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {

          return (
            <div className={classes.chipContainer}>
              {waterQualityFactors.map((f, index) => {

                const key = f.name as keyof UnitProcess

                return (
                  <Tooltip key={index} title={lang === 'en' ? waterQualityFactors[index].nameLong : waterQualityFactors[index].nameLongEs}>
                    <Chip label={data[dataIndex][key]} key={index} size="small" />
                  </Tooltip>
                )
              })}
            </div>
          )
        }
      }
    },
    {
      name: 'recovery',
      label: t('Recovery') + ' [%]',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {
          return (
            <div className={classes.chipContainer}>
              <Chip label={data[dataIndex].recovery} size="small" />
            </div>
          )
        }
      }
    },
    {
      name: 'reliability',
      label: t('Evaluation Criteria') + ' [0-3]',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {

          return (
            <div className={classes.chipContainer}>
              {evaluationCriteria.map((c, index) => {

                const key = c.name as keyof UnitProcess
                const value = data[dataIndex][key] as number

                return (

                  <Tooltip key={index} title={lang === 'en' ? evaluationCriteria[index].nameLong : evaluationCriteria[index].nameLongEs}>
                    <Chip
                      label={value}
                      key={index}
                      size="small"
                      className={classes.chip}
                      style={{ opacity: 0.25 + value / 4 }}
                    />
                  </Tooltip>

                )
              })}
            </div>
          )
        },
        setCellProps: () => ({ style: { minWidth: '25vw' } })
      }
    },
    {
      name: 'useful_life',
      label: t('Useful Life [yrs]'),
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {
          return (
            <div className={classes.chipContainer}>
              <Chip label={data[dataIndex].recovery} size="small" />
            </div>
          )
        }
      }
    }
  ]

  const options: MUIDataTableOptions = {
    filter: true,
    filterType: 'dropdown',
    selectableRows: 'none',
    rowsPerPage: 15,
    print: false
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <MUIDataTable title={t('Unit Processes')} data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  )
}