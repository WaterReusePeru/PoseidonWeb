import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import treatmentTrains from '../data/treatmentTrains.json'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import unitProcesses from '../data/unitProcesses.json'

const useStyles = makeStyles({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

const data = treatmentTrains

export default function TreatmentTrains() {
  const classes = useStyles()

  function getUnitProcesses(params) {
    const UPList = params.getValue('unit_processes')

    console.log(UPList)
    console.log(unitProcesses)

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

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.25
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 0.5
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1.5
    },
    {
      field: 'case_study',
      headerName: 'Case Study',
      flex: 0.5
    },
    {
      field: 'unit_processes',
      headerName: 'Unit Processes',
      flex: 1.5,
      renderCell: params => {
        return getUnitProcesses(params)
      }
    }
  ]

  return (
    <div style={{ flexGrow: 1 }} className={classes.root}>
      <DataGrid rows={data} columns={columns} pageSize={100} rowHeight={100} hideFooter />
    </div>
  )
}
