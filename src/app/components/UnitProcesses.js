import React from 'react'
import ReactDOM from 'react-dom'
import MUIDataTable from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import unitProcesses from '../data/unitProcesses.json'
import { theme } from '../../theme'

class UnitProcesses extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: 'none'
          }
        },
        MUIDataTableBodyCell: {
          root: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper
          }
        }
      }
    })

  render() {
    const data = unitProcesses

    const columns = [
      {
        name: 'id',
        options: {
          filter: true
        }
      },
      {
        name: 'name',
        options: {
          filter: true
        }
      },
      {
        name: 'turbity',
        label: 'Turbidity [% removal]',
        options: {
          filter: false
        }
      },
      {
        name: 'tss',
        label: 'TSS [% removal]',
        options: {
          filter: false
        }
      },
      {
        name: 'bod',
        label: 'BOD [% removal]',
        options: {
          filter: false
        }
      },
      {
        name: 'cod',
        label: 'COD [% removal]',
        options: {
          filter: false
        }
      },
      {
        name: 'fc',
        label: 'FC [% removal]',
        options: {
          filter: false
        }
      },
      {
        name: 'tc',
        label: 'TC [% removal]',
        options: {
          filter: false
        }
      },
      /* {
        name: "construction_cost_b",
        label: "const cost b",
        options: {
          filter: false
        }
      },
      {
        name: "construction_cost_c",
        label: "const cost c",
        options: {
          filter: false
        }
      },
      {
        name: "land_requirements_b",
        label: "land req b",
        options: {
          filter: false
        }
      },
      {
        name: "land_requirements_c",
        label: "land req c",
        options: {
          filter: false
        }
      },
      {
        name: "energy_requirements_b",
        label: "energy req b",
        options: {
          filter: false
        }
      },
      {
        name: "energy_requirements_c",
        label: "energy req c",
        options: {
          filter: false
        }
      },
      {
        name: "labor_requirements_b",
        label: "labor req b",
        options: {
          filter: false
        }
      },
      {
        name: "labor_requirements_c",
        label: "labor req c",
        options: {
          filter: false
        }
      },
      {
        name: "other_om_b",
        label: "other om b",
        options: {
          filter: false
        }
      },
      {
        name: "other_om_c",
        label: "other om c",
        options: {
          filter: false
        }
      }, */
      {
        name: 'recovery',
        label: 'Recovery [%]',
        options: {
          filter: false
        }
      },
      {
        name: 'reliability',
        options: {
          filter: false
        }
      },
      {
        name: 'ease_to_upgrade',
        label: 'ease to upgrade',
        options: {
          filter: false
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked'
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable title={'Unit Processes'} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    )
  }
}

export default UnitProcesses
