import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddCircle from '@mui/icons-material/AddCircle'
import BarChartIcon from '@mui/icons-material/BarChart'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import WaterQualities from '../learn/WaterQualities'
import UnitProcesses from '../learn/UnitProcesses'
import GeneralReference from '../learn//GeneralReference'
import TreatmentTrains from '../learn/TreatmentTrains'
import { Case } from '../case/Case'
import { Results } from '../results/containers/Results'
import UserMenu from '../UserMenu'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../hooks'
import { PoseidonWebIcon } from '../images/PoseidonWebIcon'
import { CaseStepper } from '../case/CaseStepper'
import { LearnMenu } from '../learn/LearnMenu'
import { ResultsMenu } from '../results/components/ResultsMenu'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '30% auto 30%',
    justifyItems: 'center',
    justifyContent: 'space-between',
  },
  caseToolbar: {
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'left',
  },
  root: {
    flexGrow: 1,
  },
  main: {
    height: '100vh',
    width: '100vw',
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 150,
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
})

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any
  }
}

export const App = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const solutionsState = useAppSelector((state) => state.case.solutions)

  return (
    <div className="App">
      <Router>
        <AppBar elevation={3}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems="flex-start" spacing={1} justifyContent="center">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                component={Link}
                to={`${process.env.PUBLIC_URL}/general`}
                startIcon={<MenuBookIcon />}
                color="inherit"
              >
                {t('Learn')}
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                component={Link}
                to={`${process.env.PUBLIC_URL}/case`}
                startIcon={<AddCircle />}
                color="inherit"
              >
                {t('Case')}
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                component={Link}
                to={`${process.env.PUBLIC_URL}/results`}
                startIcon={<BarChartIcon />}
                color="inherit"
                disabled={solutionsState[0].treatmentTrain === undefined ? true : false}
              >
                {t('Results')}
              </Button>
            </Grid>{' '}
            <Grid container alignItems="center" spacing={1} justifyContent="center">
              <Grid item>
                <PoseidonWebIcon size={24} />
              </Grid>
              <Grid item>
                <Typography variant="h6">Poseidon Web beta</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" spacing={1} justifyContent="center">
              <UserMenu />
            </Grid>{' '}
          </Toolbar>

          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/case`} component={CaseStepper} />
            <Route path={`${process.env.PUBLIC_URL}/general`} component={LearnMenu} />
            <Route path={`${process.env.PUBLIC_URL}/waterqualities`} component={LearnMenu} />
            <Route path={`${process.env.PUBLIC_URL}/unitprocesses`} component={LearnMenu} />
            <Route path={`${process.env.PUBLIC_URL}/treatmenttrains`} component={LearnMenu} />
            <Route path={`${process.env.PUBLIC_URL}/results`} component={ResultsMenu} />
            <Route path={`${process.env.PUBLIC_URL}/`} component={LearnMenu} />
          </Switch>
        </AppBar>

        <div className={classes.main}>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={GeneralReference} />
            <Route path={`${process.env.PUBLIC_URL}/case`} component={Case} />
            <Route path={`${process.env.PUBLIC_URL}/results`} component={Results} />
            <Route path={`${process.env.PUBLIC_URL}/general`} component={GeneralReference} />
            <Route path={`${process.env.PUBLIC_URL}/waterqualities`} component={WaterQualities} />
            <Route path={`${process.env.PUBLIC_URL}/unitprocesses`} component={UnitProcesses} />
            <Route path={`${process.env.PUBLIC_URL}/treatmenttrains`} component={TreatmentTrains} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
