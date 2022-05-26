import { Typography } from '@mui/material'
import { ResultsGraph } from '../components/ResultsGraphs'
import { ResultsTable } from '../components/ResultsTable'
import { useTranslation } from 'react-i18next'

export const Results = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Typography variant="h6">{t('Results')}</Typography>
      <div style={{ height: 500, width: '100%' }}>
        <ResultsGraph />
      </div>
      <ResultsTable />
    </div>
  )
}
