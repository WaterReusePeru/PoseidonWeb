import { createMuiTheme } from '@material-ui/core'

const colors = {
  main: '#00838f'
}

const secondary = {
  main: '#2196f3'
}

export const theme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary
  }
})

export const lightTheme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'light'
  }
})

export const darkTheme = createMuiTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'dark'
  }
})
