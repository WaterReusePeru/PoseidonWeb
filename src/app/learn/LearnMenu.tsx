import React from 'react'

import makeStyles from '@mui/styles/makeStyles'
import { Link } from 'react-router-dom'
import { Paper, Theme, Tabs, Tab } from '@mui/material'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export const LearnMenu = () => {
  const { t } = useTranslation()

  const classes = useStyles()

  const [menuPoint, setMenuPoint] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuPoint(newValue)
  }

  return (
    <Paper className={classes.root} square elevation={0}>
      <Tabs value={menuPoint} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        <Tab label={t('General Reference')} to={`${process.env.PUBLIC_URL}/general`} component={Link} />
        <Tab label={t('Water Qualities')} to={`${process.env.PUBLIC_URL}/waterqualities`} component={Link} />
        <Tab label={t('Unit Processes')} to={`${process.env.PUBLIC_URL}/unitprocesses`} component={Link} />
        <Tab label={t('Treatment Trains')} to={`${process.env.PUBLIC_URL}/treatmenttrains`} component={Link} />
      </Tabs>
    </Paper>
  )
}
