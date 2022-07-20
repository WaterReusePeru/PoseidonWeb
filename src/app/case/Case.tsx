import makeStyles from '@mui/styles/makeStyles'
import CommInfo from './CommInfo'
import Input from './Input'
import EndUse from './EndUse'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../hooks'
import { next, previous } from './caseSlice'
import { theme } from '../theme/theme'
import { useTranslation } from 'react-i18next'
import { Theme } from '@mui/material'
import { Link as ReactLink } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    minHeight: 'calc(100vh - 150px)',
  },
  root: {
    flexGrow: 1,
    paddingTop: 130,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <CommInfo />
    case 1:
      return <Input />
    case 2:
      return <EndUse />
    default:
      return 'Unknown step'
  }
}

export const Case = () => {
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
    <div className="App">
      <Paper elevation={0}>
        <Grid container spacing={3}>
          <Grid item container xs={12}>
            <Grid item container direction="column" alignItems="center" className={classes.step}>
              {getStepContent(count)}

              <div style={{ paddingTop: theme.spacing(2) }}>
                <Button disabled={count === 0} onClick={() => dispatch(previous())} className={classes.button}>
                  {t('Back')}
                </Button>
                {count === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    component={ReactLink}
                    className={classes.button}
                    to={`${process.env.PUBLIC_URL}/results`}
                  >
                    {t('See Results')}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(next())}
                    className={classes.button}
                    disabled={completedSteps.includes(count) ? false : true}
                  >
                    {t('Next')}
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
