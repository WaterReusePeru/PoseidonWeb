import { App as AppComponent } from '../components/App'
import * as React from 'react'
import { CssBaseline, MuiThemeProvider as ThemeProvider } from '@material-ui/core'
import { theme } from '../theme/theme'

export const App = () => {
  // This is the only place we need to access the theme via our own model
  // From here on, it is safe and convenient to use the `useTheme` hook
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppComponent />
    </ThemeProvider>
  )
}
