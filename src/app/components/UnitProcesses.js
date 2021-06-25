import React from 'react'
import MUIDataTable from 'mui-datatables'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import unitProcesses from '../data/unitProcesses.json'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

import { withTranslation } from 'react-i18next'
import i18next from 'i18next'

const styles = theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

class UnitProcesses extends React.Component {
  getMuiTheme = theme => ({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: 'none'
        }
      }
    }
  })

  render() {
    const { t, classes } = this.props

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
          customBodyRenderLite: dataIndex => {
            const columns = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']
            const columnTitles = [t('Turbidity'), 'TSS', 'BOD', 'COD', 'FC', 'TC']

            return (
              <div className={classes.chipContainer}>
                {columns.map((column, index) => (
                  <Tooltip title={columnTitles[index]}>
                    <Chip label={data[dataIndex][column]} key={index} size="small" />
                  </Tooltip>
                ))}
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
          customBodyRenderLite: dataIndex => {
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
          customBodyRenderLite: dataIndex => {
            const columns = [
              'reliability',
              'ease_to_upgrade',
              'adaptability_to_varying_flow',
              'adaptability_to_varying_quality',
              'ease_of_om',
              'ease_of_construction',
              'ease_of_demonstration',
              'power_demand',
              'chemical_demand',
              'odor_generation',
              'impact_on_ground_water',
              'land_requirements',
              'cost_of_treatment',
              'waste'
            ]
            const columnTitles = [
              t('reliability'),
              t('ease to upgrade'),
              t('adaptability to varying flow'),
              t('adaptability to varying quality'),
              t('ease of O & M'),
              t('ease of construction'),
              t('ease of demonstration'),
              t('power demand'),
              t('chemical_demand'),
              t('odor generation'),
              t('impact on ground water'),
              t('land requirements'),
              t('cost of treatment'),
              t('waste')
            ]

            return (
              <div className={classes.chipContainer}>
                {columns.map((column, index) => (
                  <Tooltip title={columnTitles[index]}>
                    <Chip
                      label={data[dataIndex][column]}
                      key={index}
                      size="small"
                      color="primary"
                      style={{ opacity: 0.25 + data[dataIndex][column] / 4 }}
                    />
                  </Tooltip>
                ))}
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
          customBodyRenderLite: dataIndex => {
            return (
              <div className={classes.chipContainer}>
                <Chip label={data[dataIndex].recovery} size="small" />
              </div>
            )
          }
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'dropdown',
      selectableRows: 'none',
      rowsPerPage: 20,
      print: false
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable title={t('Unit Processes')} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withTranslation()(UnitProcesses))
