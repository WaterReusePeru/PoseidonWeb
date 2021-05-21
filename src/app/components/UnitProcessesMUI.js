import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import unitProcesses from '../data/unitProcesses.json'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import { theme } from '../../theme'

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
    console.log(params)

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

  function getEvaluationCriteria(params) {
    console.log(params)

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

  const columns = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200
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
      flex: 0.5
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
      flex: 0.5
    }
  ]

  return (
    <div style={{ flexGrow: 1 }} className={classes.root}>
      <DataGrid rows={data} columns={columns} pageSize={10} />
    </div>
  )
}
