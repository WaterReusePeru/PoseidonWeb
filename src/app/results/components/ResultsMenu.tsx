import React from 'react'

import makeStyles from '@mui/styles/makeStyles'
import { Paper, Theme, Tabs } from '@mui/material'

//import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export const ResultsMenu = () => {
  //const { t } = useTranslation()

  const classes = useStyles()

  const [menuPoint, setMenuPoint] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setMenuPoint(newValue)
  }

  return (
    <Paper className={classes.root} square elevation={0}>
      <Tabs value={menuPoint} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        {/*
        <Tab label={t('Table')} to={`${process.env.PUBLIC_URL}/results`} component={Link} />
        <Tab label={t('Graph')} to={`${process.env.PUBLIC_URL}/results`} component={Link} />
        */}
      </Tabs>
    </Paper>
  )
}
