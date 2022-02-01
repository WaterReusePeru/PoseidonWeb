import { MUIDataTableOptions } from 'mui-datatables'

export const options: MUIDataTableOptions = {
  filter: true,
  filterType: 'dropdown',
  selectableRows: 'none',
  rowsPerPage: 20,
  print: false,
  fixedHeader: true,
  elevation: 0,
}
