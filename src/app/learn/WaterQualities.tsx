import MUIDataTable from 'mui-datatables'
import { options } from '../theme/tables'

import { StyledEngineProvider, Theme } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'
import { WaterQuality, waterQualityFactors } from '../data/model'

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

export default function UnitProcesses() {
  const classes = useStyles()

  const { t } = useTranslation()

  const data = waterQualities
  const qualities = waterQualityCategories

  const lang = i18next.language

  var nameCol = lang === 'en' ? 'name' : 'nameEs'
  var noteCol = lang === 'en' ? 'note' : 'noteEs'
  var referenceCol = lang === 'en' ? 'reference' : 'referenceEs'

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
      },
    },
    {
      name: 'category',
      label: t('Category'),
      options: {
        filter: true,
        customBodyRender: (value: number) => {
          return <div>{lang === 'en' ? qualities[value].name : qualities[value].nameEs}</div>
        },
      },
    },
    {
      name: nameCol,
      label: t('Name'),
      options: {
        filter: true,
      },
    },
    {
      name: 'wqi',
      label: t('Water Quality Indicators'),
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex: number) => {
          return (
            <div className={classes.chipContainer}>
              {waterQualityFactors.map((f, index) => {
                const key = f.name as keyof WaterQuality

                return (
                  <Tooltip
                    key={index}
                    title={
                      lang === 'en'
                        ? waterQualityFactors[index].nameLong + ' [' + waterQualityFactors[index].unit + ']'
                        : waterQualityFactors[index].nameLongEs + ' [' + waterQualityFactors[index].unit + ']'
                    }
                  >
                    <Chip label={data[dataIndex][key] !== null ? data[dataIndex][key] : '-'} key={index} size="small" />
                  </Tooltip>
                )
              })}
            </div>
          )
        },
        setCellProps: () => ({ style: { minWidth: '20vw' } }),
      },
    },
    {
      name: noteCol,
      label: t('Note'),
      options: {
        filter: true,
      },
    },
    {
      name: referenceCol,
      label: t('Reference'),
      options: {
        filter: true,
      },
    },
  ]

  return (
    <StyledEngineProvider injectFirst>
      <MUIDataTable title={t('Water Qualities')} data={data} columns={columns} options={options} />
    </StyledEngineProvider>
  )
}
