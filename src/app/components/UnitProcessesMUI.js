import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import unitProcesses from '../data/unitProcesses.json'

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
  }
})

const data = unitProcesses

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
    field: 'turbity',
    headerName: 'Turbidity [% removal]',
    flex: 1,
    headerClassName: 'wrapperHeader'
  },
  {
    field: 'tss',
    headerName: 'TSS [% removal]',
    flex: 1
  },
  {
    field: 'bod',
    headerName: 'BOD [% removal]',
    flex: 1
  },
  {
    field: 'cod',
    headerName: 'COD [% removal]',
    flex: 1
  },
  {
    field: 'fc',
    headerName: 'FC [% removal]',
    flex: 1
  },
  {
    field: 'tc',
    headerName: 'TC [% removal]',
    flex: 1
  },
  /* {
    field: "construction_cost_b",
    headerName: "const cost b",
  },
  {
    field: "construction_cost_c",
    headerName: "const cost c",
  },
  {
    field: "land_requirements_b",
    headerName: "land req b",
  },
  {
    field: "land_requirements_c",
    headerName: "land req c",
  },
  {
    field: "energy_requirements_b",
    headerName: "energy req b",
  },
  {
    field: "energy_requirements_c",
    headerName: "energy req c",
  },
  {
    field: "labor_requirements_b",
    headerName: "labor req b",
  },
  {
    field: "labor_requirements_c",
    headerName: "labor req c",
  },
  {
    field: "other_om_b",
    headerName: "other om b",
  },
  {
    field: "other_om_c",
    headerName: "other om c",
  }, */
  {
    field: 'recovery',
    headerName: 'Recovery [%]',
    flex: 1
  },
  {
    field: 'reliability',
    headerName: 'Reliability',
    flex: 1
  },
  {
    field: 'ease_to_upgrade',
    headerName: 'Ease to Upgrade'
  }
]

export default function UnitProcesses() {
  const classes = useStyles()

  return (
    <div style={{ flexGrow: 1 }} className={classes.root}>
      <DataGrid rows={data} columns={columns} pageSize={20} headerHeight={120} />
    </div>
  )
}
