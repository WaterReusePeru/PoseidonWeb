import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddCircle from '@mui/icons-material/AddCircle'
import BarChartIcon from '@mui/icons-material/BarChart'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
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
    height: '100vh-100',
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

          <Routes>
            <Route path={`${process.env.PUBLIC_URL}/case`} element={<CaseStepper />} />
            <Route path={`${process.env.PUBLIC_URL}/general`} element={<LearnMenu />} />
            <Route path={`${process.env.PUBLIC_URL}/waterqualities`} element={<LearnMenu />} />
            <Route path={`${process.env.PUBLIC_URL}/unitprocesses`} element={<LearnMenu />} />
            <Route path={`${process.env.PUBLIC_URL}/treatmenttrains`} element={<LearnMenu />} />
            <Route path={`${process.env.PUBLIC_URL}/results`} element={<ResultsMenu />} />
            <Route path={`${process.env.PUBLIC_URL}/`} element={<LearnMenu />} />
          </Routes>
        </AppBar>

        <div className={classes.main}>
          <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<GeneralReference />} />
            <Route path={`${process.env.PUBLIC_URL}/case`} element={<Case />} />
            <Route path={`${process.env.PUBLIC_URL}/results`} element={<Results />} />
            <Route path={`${process.env.PUBLIC_URL}/general`} element={<GeneralReference />} />
            <Route path={`${process.env.PUBLIC_URL}/waterqualities`} element={<WaterQualities />} />
            <Route path={`${process.env.PUBLIC_URL}/unitprocesses`} element={<UnitProcesses />} />
            <Route path={`${process.env.PUBLIC_URL}/treatmenttrains`} element={<TreatmentTrains />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
