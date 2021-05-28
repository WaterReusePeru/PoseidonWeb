import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import unitProcesses from '../data/unitProcesses.json'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  root: {
    '& .wrapperHeader': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)'
    }
    /*     '& .MuiDataGrid-colCellTitle': {
      whiteSpace: 'initial'
    },
    '& .MuiDataGrid-columnsContainer': {
      lineHeight: 'inherit'
    }, */
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

const data = unitProcesses

export default function UnitProcesses() {
  const classes = useStyles()

  function getPollutantRemovalEfficiencies(params) {
    const columns = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']
    const columnTitles = ['Turbidity', 'TSS', 'BOD', 'COD', 'FC', 'TC']

    return (
      <div className={classes.chipContainer}>
        {columns.map((column, index) => (
          <Tooltip title={columnTitles[index]}>
            <Chip label={params.getValue(column)} key={index} size="small" />
          </Tooltip>
        ))}
      </div>
    )
  }

  function getRecovery(params) {
    return (
      <div className={classes.chipContainer}>
        <Chip label={params.getValue('recovery')} size="small" />
      </div>
    )
  }

  function getEvaluationCriteria(params) {
    const columns = [
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
              label={params.getValue(column)}
              key={index}
              size="small"
              color="primary"
              style={{ opacity: 0.25 + params.getValue(column) / 4 }}
            />
          </Tooltip>
        ))}
      </div>
    )
  }

  function getUsefulLife(params) {
    return (
      <div className={classes.chipContainer}>
        <Chip label={params.getValue('useful_life')} size="small" />
      </div>
    )
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.25
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5
    },
    {
      field: 'turbidity',
      headerName: 'Pollutant Removal Efficiencies [% removal]',
      flex: 1,
      renderCell: params => {
        return getPollutantRemovalEfficiencies(params)
      }
    },
    {
      field: 'recovery',
      headerName: 'Recovery [%]',
      flex: 0.5,
      renderCell: params => {
        return getRecovery(params)
      }
    },
    {
      field: 'ease_to_upgrade',
      headerName: 'Evaluation Criteria [0-3]',
      flex: 1.5,
      renderCell: params => {
        return getEvaluationCriteria(params)
      }
    },
    {
      field: 'useful_life',
      headerName: 'Useful Life [yrs]',
      flex: 0.5,
      renderCell: params => {
        return getUsefulLife(params)
      }
    }
  ]

  return (
    <div style={{ flexGrow: 1 }} className={classes.root}>
      <DataGrid rows={data} columns={columns} pageSize={100} hideFooter />
    </div>
  )
}
