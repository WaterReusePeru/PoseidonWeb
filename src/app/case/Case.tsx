import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'

import CommInfo from './CommInfo'
import InputQuality from './InputQuality'
import EndUse from './EndUse'
import Quantity from './Quantity'
import { CaseSummary } from './CaseSummary'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '../hooks'

import { next, previous, reset } from './caseSlice'
import { theme } from '../theme/theme'
import { useTranslation } from 'react-i18next'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between',
  },
  main: {
    display: 'grid',
    height: 'calc(100vh - 200px)',
    width: '100vw',
    gridTemplateColumns: '1fr',
    gridRowGap: 8,
    justifyItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    paddingTop: 50,
  },
  step: {
    minHeight: 'calc(100vh - 300px)',
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 80,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const CustomConnector = withStyles({
  root: {
    alignSelf: 'flex-start',
    paddingTop: '13px', //This hardcoded value sets the line in the middle of the stepper icons. It's not optimal.
  },
  line: {
    borderRadius: 1,
  },
})(StepConnector)

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <CommInfo />
    case 1:
      return <InputQuality />
    case 2:
      return <EndUse />
    case 3:
      return <Quantity />
    default:
      return 'Unknown step'
  }
}

export const Case = () => {
  const { t } = useTranslation()

  const getSteps = () => {
    return [
      t('Community Information'),
      t('Input Quality'),
      t('End Use'),
      t('Quantity') /* , t('Personalize Solutions') */,
    ]
  }

  const count = useAppSelector((state) => state.case.step)
  const completedSteps = useAppSelector((state) => state.case.completedSteps)

  const dispatch = useDispatch()

  const classes = useStyles()
  const steps = getSteps()

  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <div className="App">
      <Paper className={classes.root} square elevation={3}>
        <Stepper activeStep={count} connector={<CustomConnector />}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps} style={{ alignSelf: 'flex-start' }}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <CaseSummary step={index} />
              </Step>
            )
          })}
        </Stepper>
      </Paper>

      <div className={classes.main}>
        <Paper elevation={0} style={{ padding: 10 }}>
          <Grid container spacing={3}>
            <Grid item container xs={12}>
              {count === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <Grid item container direction="column" alignItems="center" className={classes.step}>
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
          </Grid>
        </Paper>
      </div>
    </div>
  )
}
