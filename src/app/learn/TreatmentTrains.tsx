import MUIDataTable from 'mui-datatables'
import { options } from '../theme/tables'
import { StyledEngineProvider, Theme } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

import { unitProcesses, treatmentTrains } from '../data/model'

import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

const useStyles = makeStyles((theme: Theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2,
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function TreatmentTrains() {
  const classes = useStyles()

  const { t } = useTranslation()

  const data = treatmentTrains

  const lang = i18next.language

  var categoryCol = lang === 'en' ? 'category' : 'categoryEs'
  var titleCol = lang === 'en' ? 'title' : 'titleEs'
  var descriptionCol = lang === 'en' ? 'description' : 'descriptionEs'
  var caseStudyCol = lang === 'en' ? 'case_study' : 'case_studyEs'

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
      },
    },
    {
      name: categoryCol,
      label: t('Category'),
      options: {
        filter: true,
      },
    },
    {
      name: titleCol,
      label: t('Title'),
      options: {
        filter: true,
      },
    },
    {
      name: descriptionCol,
      label: t('Description'),
      options: {
        filter: true,
      },
    },
    {
      name: caseStudyCol,
      label: t('Case Study'),
      options: {
        filter: true,
        setCellProps: () => ({ style: { maxWidth: '20vw' } }),
      },
    },
    {
      name: 'unit_processes',
      label: t('Unit Processes'),
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {
          const UPList = data[dataIndex].unit_processes

          return (
            <div className={classes.chipContainer}>
              {UPList &&
                UPList.map((up, index) => (
                  <Tooltip key={index} title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
                    <Chip label={up} key={index} size="small" color="primary" className={classes.chip} />
                  </Tooltip>
                ))}
            </div>
          )
        },
        setCellProps: () => ({ style: { minWidth: '15vw' } }),
      },
    },
  ]

  return (
    <StyledEngineProvider injectFirst>
      <MUIDataTable title={t('Treatment Trains')} data={data} columns={columns} options={options} />
    </StyledEngineProvider>
  )
}
