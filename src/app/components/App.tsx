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
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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
    paddingTop: 160,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw'
  },
  title: {
    textAlign: 'left'
  },
  root: {
    flexGrow: 1
  }
})

export const App = () => {
  const classes = useStyles()

  const [menuPoint, setMenuPoint] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuPoint(newValue)
  }

  return (
    <div className="App">
      <Router>
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
          <Paper className={classes.root} square>
            <Tabs value={menuPoint} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
              <Tab label="General Reference" />
              <Tab label="PESTLE" />
              <Tab label="Unit Processes" to="/unitprocesses" component={Link} />
              <Tab label="Treatment Trains" to="/treatmenttrains" component={Link} />
              <Tab label="Case Studies" />
            </Tabs>
          </Paper>
        </AppBar>

        <div className={classes.main}>
          <Switch>
            <Route exact path="/" component={UnitProcesses} />
            <Route path="/unitprocesses" component={UnitProcesses} />
            <Route path="/treatmenttrains" component={TreatmentTrains} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
