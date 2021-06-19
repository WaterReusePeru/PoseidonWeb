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
        label: 'Name',
        options: {
          filter: true
        }
      },
      {
        name: 'turbidity',
        label: 'Pollutant Removal Efficiencies [% removal]',
        options: {
          filter: false,
          customBodyRenderLite: dataIndex => {
            const columns = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']
            const columnTitles = ['Turbidity', 'TSS', 'BOD', 'COD', 'FC', 'TC']

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
        label: 'Recovery [%]',
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
        label: 'Evaluation Criteria [0-3]',
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
              'reliability',
              'ease to upgrade',
              'adaptability to varying flow',
              'adaptability to varying quality',
              'ease of O & M',
              'ease of construction',
              'ease of demonstration',
              'power demand',
              'chemical_demand',
              'odor generation',
              'impact on ground water',
              'land requirements',
              'cost of treatment',
              'waste'
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
        label: 'Useful Life [yrs]',
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
      rowsPerPage: 100,
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
