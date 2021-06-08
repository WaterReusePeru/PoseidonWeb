import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

const styles = theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

class CommInfo extends React.Component {
  render() {
    //const { classes } = this.props

    return <Typography>Step one</Typography>
  }
}

export default withStyles(styles)(CommInfo)
