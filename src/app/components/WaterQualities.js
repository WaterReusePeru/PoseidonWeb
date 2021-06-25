import React from 'react'
import MUIDataTable from 'mui-datatables'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import waterQualities from '../data/waterQualities.json'
import waterQualityCategories from '../data/waterQualityCategories.json'

import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

import { withTranslation } from 'react-i18next'
import i18next from 'i18next'

const styles = theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: 2
    }
  }
})

class WaterQualities extends React.Component {
  getMuiTheme = theme => ({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: 'none'
        }
      }
    }
  })

  render() {
    const { t, classes } = this.props

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
          filter: true
        }
      },
      {
        name: 'category',
        label: t('Category'),
        options: {
          filter: true,
          customBodyRender: value => {
            return <div>{lang === 'en' ? qualities[value].name : qualities[value].nameEs}</div>
          }
        }
      },
      {
        name: nameCol,
        label: t('Name'),
        options: {
          filter: true
        }
      },
      {
        name: 'wqi',
        label: t('Water Quality Indicators'),
        options: {
          filter: false,
          customBodyRenderLite: dataIndex => {
            const columns = ['turbidity', 'tss', 'bod', 'cod', 'fc', 'tc']
            const columnTitles = [t('Turbidity'), 'TSS', 'BOD', 'COD', 'FC', 'TC']

            return (
              <div className={classes.chipContainer}>
                {columns.map((column, index) => (
                  <Tooltip title={columnTitles[index]}>
                    <Chip
                      label={data[dataIndex][column] !== '-1' ? data[dataIndex][column] : '-'}
                      key={index}
                      size="small"
                    />
                  </Tooltip>
                ))}
              </div>
            )
          },
          setCellProps: () => ({ style: { minWidth: '20vw' } })
        }
      },
      {
        name: noteCol,
        label: t('Note'),
        options: {
          filter: true
        }
      },
      {
        name: referenceCol,
        label: t('Reference'),
        options: {
          filter: true
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'dropdown',
      selectableRows: 'none',
      rowsPerPage: 20,
      print: false
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable title={t('Water Qualities')} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withTranslation()(WaterQualities))
