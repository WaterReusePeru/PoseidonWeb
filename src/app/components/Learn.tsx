import React from 'react'

import makeStyles from '@material-ui/core/styles/makeStyles'
import UnitProcesses from './UnitProcesses'

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
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 50
  },
  title: {
    textAlign: 'left'
  },
  root: {
    flexGrow: 1,
    paddingTop: 60
  }
})

export const Learn = () => {
  const classes = useStyles()

  const [menuPoint, setMenuPoint] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuPoint(newValue)
  }

  return (
    <div className="App">
      <Router>
        <Paper className={classes.root} square elevation={3}>
          <Tabs value={menuPoint} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="General Reference" />
            <Tab label="PESTLE" />
            <Tab label="Unit Processes" to="/unitprocesses" component={Link} />
            <Tab label="Treatment Trains" to="/treatmenttrains" component={Link} />
            <Tab label="Case Studies" />
          </Tabs>
        </Paper>

        <div className={classes.main}>
          <Switch>
            <Route exact path="/learn/" component={UnitProcesses} />
            <Route path="/unitprocesses" component={UnitProcesses} />
            <Route path="/treatmenttrains" component={TreatmentTrains} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
