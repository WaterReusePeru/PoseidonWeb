import { useTranslation } from 'react-i18next'

export default function TextLabels() {

    const { t } = useTranslation()

    const textLabels = {
        textLabels: {
            body: {
                noMatch: t('Sorry, no matching records found'),
                toolTip: t('Sort'),
                columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
                next: "Next Page",
                previous: "Previous Page",
                rowsPerPage: "Rows per page:",
                displayRows: "of",
            },
            toolbar: {
                search: "Search",
                downloadCsv: "Download CSV",
                print: "Print",
                viewColumns: "View Columns",
                filterTable: "Filter Table",
            },
            filter: {
                all: "All",
                title: "FILTERS",
                reset: "RESET",
            },
            viewColumns: {
                title: "Show Columns",
                titleAria: "Show/Hide Table Columns",
            },
            selectedRows: {
                text: "row(s) selected",
                delete: "Delete",
                deleteAria: "Delete Selected Rows",
            },
        }
    }

    return (
        textLabels
    )
} 


