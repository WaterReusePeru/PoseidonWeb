import makeStyles from '@mui/styles/makeStyles'
//import withStyles from '@mui/styles/withStyles'
import { CaseSummary } from './CaseSummary'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
//import StepConnector from '@mui/material/StepConnector'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setStep } from './caseSlice'
import { useTranslation } from 'react-i18next'
import { Link, Paper, Theme, Toolbar } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '100%',
  },
  caseToolbar: {
    backgroundColor: '#fff',
  },
}))

/* const CustomConnector = withStyles({
  root: {
    alignSelf: 'flex-start',
    paddingTop: '13px', //This hardcoded value sets the line in the middle of the stepper icons. It's not optimal.
  },
  line: {
    borderRadius: 1,
  },
})(StepConnector) */

export const CaseStepper = () => {
  const { t } = useTranslation()

  const getSteps = () => {
    return [t('Community Information'), t('Input'), t('End Use')]
  }

  const count = useAppSelector((state) => state.case.step)
  const completedSteps = useAppSelector((state) => state.case.completedSteps)

  const dispatch = useAppDispatch()

  const classes = useStyles()
  const steps = getSteps()

  return (
    <Toolbar className={classes.caseToolbar}>
      <Paper className={classes.root} square elevation={0}>
        <Stepper activeStep={count}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            return (
              <Step key={label} {...stepProps} style={{ alignSelf: 'flex-start' }}>
                <StepLabel {...labelProps}>
                  <Link
                    component="button"
                    variant="caption"
                    underline="hover"
                    color="inherit"
                    disabled={completedSteps[count - 1] || index === 0 ? false : true}
                    onClick={() => dispatch(setStep(index))}
                  >
                    {label}
                  </Link>
                </StepLabel>
                <CaseSummary step={index} />
              </Step>
            )
          })}
        </Stepper>
      </Paper>
    </Toolbar>
  )
}
