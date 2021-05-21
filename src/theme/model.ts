import { createMuiTheme, Theme } from '@material-ui/core'

export type ThemeState = Theme

/* const colors = {
  main: '#00bcd4',
  light: '#62efff',
  dark: '#008ba3'
} */

const colors = {
  main: '#00838f'
}

const secondary = {
  main: '#ef6c00'
}

export const theme: Theme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary
  }
})

export const lightTheme: Theme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'light'
  }
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'dark'
  }
})
