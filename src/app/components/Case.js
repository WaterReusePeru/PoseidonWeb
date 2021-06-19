import React from 'react'

import makeStyles from '@material-ui/core/styles/makeStyles'

import CommInfo from './CommInfo'
import InputQQ from './InputQQ'
import EndUse from './EndUse'
import CaseBox from './CaseBox'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { useSelector, useDispatch } from 'react-redux'
import { next, previous, reset } from '../case/caseSlice'
import { theme } from '../theme/theme'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between'
  },
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    paddingTop: 50
  },
  step: {
    minHeight: 'calc(100vh - 300px)'
  },
  root: {
    flexGrow: 1,
    paddingTop: 60
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CommInfo />
    case 1:
      return <InputQQ />
    case 2:
      return <EndUse />
    case 3:
      return 'Personalize'
    default:
      return 'Unknown step'
  }
}

export const Case = () => {
  const { t, i18n } = useTranslation()

  const getSteps = () => {
    return [t('Community Information'), t('Input Quality & Quantity'), t('End Use'), t('Personalize')]
  }

  const count = useSelector(state => state.case.step)
  const completedSteps = useSelector(state => state.case.completedSteps)
  console.log(completedSteps)

  const dispatch = useDispatch()

  const classes = useStyles()
  const steps = getSteps()

  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <div className="App">
      <Paper className={classes.root} square elevation={3}>
        <Stepper activeStep={count}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Paper>

      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <Grid container spacing={3}>
            <Grid item container xs={9}>
              {count === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                  className={classes.step}
                >
                  {getStepContent(count)}

                  <div style={{ paddingTop: theme.spacing(2) }}>
                    <Button disabled={count === 0} onClick={() => dispatch(previous())} className={classes.button}>
                      {t('Back')}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => dispatch(next())}
                      className={classes.button}
                      disabled={completedSteps.includes(count) ? false : true}
                    >
                      {count === steps.length - 1 ? t('Finish') : t('Next')}
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
            <Grid item xs={3}>
              <CaseBox />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}
