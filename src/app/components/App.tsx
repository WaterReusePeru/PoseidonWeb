import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AddBoxIcon from '@material-ui/icons/AddBox'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Learn } from './Learn'
import { Case } from './Case'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between'
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

  return (
    <div className="App">
      <Router>
        <AppBar elevation={0}>
          <Toolbar className={classes.toolbar}>
            <div>
              <Tooltip title="Learn">
                <Link to="/learn">
                  <IconButton>
                    <MenuBookIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="New Case">
                <Link to="/case">
                  <IconButton>
                    <AddBoxIcon />
                  </IconButton>
                </Link>
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
            <div style={{ width: 150 }} />
            {/* <ThemeSwitch /> */}
          </Toolbar>
        </AppBar>

        <div>
          <Switch>
            <Route exact path="/" component={Learn} />
            <Route path="/learn/:id?" component={Learn} />
            <Route path="/case" component={Case} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
