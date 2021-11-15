import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  drop: {
    fill: theme.palette.background.default,
    stroke: theme.palette.background.default,
    strokeMiterlimit: 10
  },
  p: {
    stroke: theme.palette.primary.main,
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: '2px'
  },
}))

interface Props {
  readonly size: number
}

export const PoseidonWebIcon = ({ size }: Props) => {

  const classes = useStyles()
  return (
    
      <svg id="Icon_Name" data-name="Icon Name" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
        <path className={classes.drop} d="M12.05662.85115s-25.16751,22.17563,0,22.29788C37.1519,23.27094,11.94259.70846,12.05662.85115Z" />
        <path className={classes.p} d="M6.99152,21.31234V8.3355s11.09965-.54124,11.63938,3.66112c.66118,5.14794-11.62619,3.66558-11.63938,2.611" />
      </svg>
  )
}