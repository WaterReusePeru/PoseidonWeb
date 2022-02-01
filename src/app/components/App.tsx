import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddBoxIcon from '@mui/icons-material/AddBox'
import BarChartIcon from '@mui/icons-material/BarChart'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Learn } from '../learn/Learn'
import { Case } from '../case/Case'
import { Results } from '../results/Results'
import UserMenu from '../UserMenu'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../hooks'
import { PoseidonWebIcon } from '../images/PoseidonWebIcon'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '30% auto 30%',
    justifyItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
  },
  root: {
    flexGrow: 1,
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
        <AppBar elevation={0}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems="flex-start" spacing={1} justifyContent="center">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                component={Link}
                to={`${process.env.PUBLIC_URL}/learn`}
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
                startIcon={<AddBoxIcon />}
                color="inherit"
              >
                {t('New Case')}
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
        </AppBar>

        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Learn} />
            <Route path={`${process.env.PUBLIC_URL}/learn`} component={Learn} />
            <Route path={`${process.env.PUBLIC_URL}/case`} component={Case} />
            <Route path={`${process.env.PUBLIC_URL}/results`} component={Results} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
