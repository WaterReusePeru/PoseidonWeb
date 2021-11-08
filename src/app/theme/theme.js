import { createTheme } from '@material-ui/core'

const colors = {
  main: '#00838f'
}

const secondary = {
  main: '#2196f3'
}

export const theme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary
  }
})

export const lightTheme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'light'
  }
})

export const darkTheme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    type: 'dark'
  }
})
