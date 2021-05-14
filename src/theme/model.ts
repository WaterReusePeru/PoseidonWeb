import { createMuiTheme, Theme } from '@material-ui/core'

export type ThemeState = Theme

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      light: '#62efff',
      dark: '#008ba3'
    }
  }
})

const colors = {
  main: '#00bcd4',
  light: '#62efff',
  dark: '#008ba3'
}

export const lightTheme: Theme = createMuiTheme({
  palette: {
    primary: colors,
    type: 'light'
  }
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    primary: colors,
    type: 'dark'
  }
})
