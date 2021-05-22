import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeSwitch } from '../../theme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import UnitProcesses from './UnitProcessesMUI'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AddBoxIcon from '@material-ui/icons/AddBox'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import TreatmentTrains from './TreatmentTrains'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between'
  },
  main: {
    display: 'grid',
    height: '100vh',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    paddingTop: 100,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw'
  },
  title: {
    textAlign: 'left'
  }
})

export const App = () => {
  const classes = useStyles()

  return (
    <div className="App">
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div>
            <Tooltip title="Learn">
              <IconButton color="inherit">
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="New Case">
              <IconButton color="inherit">
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Results">
              <IconButton color="default">
                <ShowChartIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.title}>
            <Typography>Poseidon Web alpha 0.1</Typography>
          </div>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <Router>
          <Switch>
            <Route exact path="/" component={UnitProcesses} />
            <Route path="/unitprocesses" component={UnitProcesses} />
            <Route path="/treatmenttrains" component={TreatmentTrains} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}
