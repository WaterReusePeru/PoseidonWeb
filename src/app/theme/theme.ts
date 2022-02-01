import { createTheme } from '@mui/material'

const colors = {
  main: '#0097a7',
}

const secondary = {
  main: '#1976d2',
}

export const theme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary,
  },
})

export const lightTheme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    mode: 'light',
  },
})

export const darkTheme = createTheme({
  palette: {
    primary: colors,
    secondary: secondary,
    mode: 'dark',
  },
})
