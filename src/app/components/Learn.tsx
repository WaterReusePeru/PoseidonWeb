import React from 'react'

import makeStyles from '@material-ui/core/styles/makeStyles'
import UnitProcesses from './UnitProcesses'
import GeneralReference from './GeneralReference'
import Pestle from './Pestle'
import CaseStudies from './CaseStudies'

import TreatmentTrains from './TreatmentTrains'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { useTranslation } from 'react-i18next'
import WaterQualities from './WaterQualities'

const useStyles = makeStyles({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between'
  },
  main: {
    display: 'grid',
    minHeight: 'calc(100vh - 300px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 20
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
  const { t } = useTranslation()

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
            <Tab label={t('General Reference')} to={`${process.env.PUBLIC_URL}/general`} component={Link} />
            {/* <Tab label={t('PESTLE')} to={`${process.env.PUBLIC_URL}/pestle`} component={Link} /> */}
            <Tab label={t('Water Qualities')} to={`${process.env.PUBLIC_URL}/waterqualities`} component={Link} />
            <Tab label={t('Unit Processes')} to={`${process.env.PUBLIC_URL}/unitprocesses`} component={Link} />
            <Tab label={t('Treatment Trains')} to={`${process.env.PUBLIC_URL}/treatmenttrains`} component={Link} />
            {/* <Tab label={t('Case Studies')} to={`${process.env.PUBLIC_URL}/casestudies`} component={Link} /> */}
          </Tabs>
        </Paper>

        <div className={classes.main}>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={GeneralReference} />
            <Route path={`${process.env.PUBLIC_URL}/learn`} component={GeneralReference} />
            <Route path={`${process.env.PUBLIC_URL}/general`} component={GeneralReference} />
            <Route path={`${process.env.PUBLIC_URL}/pestle`} component={Pestle} />
            <Route path={`${process.env.PUBLIC_URL}/waterqualities`} component={WaterQualities} />
            <Route path={`${process.env.PUBLIC_URL}/unitprocesses`} component={UnitProcesses} />
            <Route path={`${process.env.PUBLIC_URL}/treatmenttrains`} component={TreatmentTrains} />
            <Route path={`${process.env.PUBLIC_URL}/casestudies`} component={CaseStudies} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
