import React from 'react'
import MUIDataTable from 'mui-datatables'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import treatmentTrains from '../data/treatmentTrains.json'
import unitProcesses from '../data/unitProcesses.json'

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

class TreatmentTrains extends React.Component {
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
          filter: true
        }
      },
      {
        name: categoryCol,
        label: t('Category'),
        options: {
          filter: true
        }
      },
      {
        name: titleCol,
        label: t('Title'),
        options: {
          filter: true
        }
      },
      {
        name: descriptionCol,
        label: t('Description'),
        options: {
          filter: true
        }
      },
      {
        name: caseStudyCol,
        label: t('Case Study'),
        options: {
          filter: true,
          setCellProps: () => ({ style: { maxWidth: '20vw' } })
        }
      },
      {
        name: 'unit_processes',
        label: t('Unit Processes'),
        options: {
          filter: false,
          customBodyRenderLite: dataIndex => {
            const UPList = data[dataIndex].unit_processes

            return (
              <div className={classes.chipContainer}>
                {UPList.map((up, index) => (
                  <Tooltip key={index} title={lang === 'en' ? unitProcesses[up].name : unitProcesses[up].nameEs}>
                    <Chip label={up} key={index} size="small" color="primary" />
                  </Tooltip>
                ))}
              </div>
            )
          },
          setCellProps: () => ({ style: { minWidth: '15vw' } })
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'dropdown',
      selectableRows: 'none',
      rowsPerPage: 15,
      print: false,
      fixedHeader: true
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable title={t('Treatment Trains')} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withTranslation()(TreatmentTrains))
