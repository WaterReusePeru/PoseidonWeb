import React from 'react'
import MUIDataTable from 'mui-datatables'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import treatmentTrains from '../data/treatmentTrains.json'
import unitProcesses from '../data/unitProcesses.json'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

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

class TreatmentTrains extends React.Component {
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
    const { classes } = this.props

    const data = treatmentTrains

    const columns = [
      {
        name: 'id',
        label: 'ID',
        options: {
          filter: true
        }
      },
      {
        name: 'category',
        label: 'Category',
        options: {
          filter: true
        }
      },
      {
        name: 'title',
        label: 'Title',
        options: {
          filter: true
        }
      },
      {
        name: 'description',
        label: 'Description',
        options: {
          filter: true
        }
      },
      {
        name: 'case_study',
        label: 'Case Study',
        options: {
          filter: true
        }
      },
      {
        name: 'unit_processes',
        label: 'Unit Processes',
        options: {
          filter: false,
          customBodyRenderLite: dataIndex => {
            const UPList = data[dataIndex].unit_processes

            return (
              <div className={classes.chipContainer}>
                {UPList.map((up, index) => (
                  <Tooltip title={unitProcesses[up - 1].name}>
                    <Chip label={up} key={index} size="small" color="primary" />
                  </Tooltip>
                ))}
              </div>
            )
          }
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      selectableRows: 'none',
      rowsPerPage: 100,
      print: false
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable title={'Treatment Trains'} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(TreatmentTrains)
