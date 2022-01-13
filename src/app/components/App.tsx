import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AddBoxIcon from '@material-ui/icons/AddBox'
import BarChartIcon from '@material-ui/icons/BarChart'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Learn } from './Learn'
import { Case } from './Case'
import { Results } from './Results'
import UserMenu from './UserMenu'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
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
