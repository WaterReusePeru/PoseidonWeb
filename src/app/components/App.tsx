import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeSwitch } from '../../theme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import UnitProcesses from './UnitProcessesMUI'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyItems: 'end',
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
          <div className={classes.title}>
            <Typography>Poseidon Web alpha 0.1</Typography>
          </div>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <UnitProcesses />
      </div>
    </div>
  )
}
