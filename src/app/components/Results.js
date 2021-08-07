import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 110
  },
  root: {
    flexGrow: 1,
    paddingTop: 120
  }
}))

const styles = theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

export const Results = () => {
  const getMuiTheme = theme => ({
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

  const solutionsState = useSelector(state => state.case.solutions)

  const columns = [
    {
      name: 'treatmentTrain',
      label: t('Treatment Train'),
      options: {
        filter: true
      }
    },
    {
      name: 'rating',
      label: t('Rating'),
      options: {
        filter: true
      }
    },
    {
      name: 'cost',
      label: t('Cost'),
      options: {
        filter: true
      }
    }
  ]

  const data = solutionsState

  console.log(data)

  const options = {
    filter: true,
    filterType: 'dropdown',
    selectableRows: 'none',
    rowsPerPage: 20,
    print: false
  }

  return (
    <div className="App">
      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable title={t('Results')} data={data} columns={columns} options={options} />
          </MuiThemeProvider>
        </Paper>
      </div>
    </div>
  )
}
