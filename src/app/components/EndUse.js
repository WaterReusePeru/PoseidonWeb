import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

export default function EndUse() {
  const count = useSelector(state => state.step)

  return <Typography>Step {count}</Typography>
}
