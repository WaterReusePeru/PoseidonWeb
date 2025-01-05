import { App as AppComponent } from '../components/App'
import * as React from 'react'
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material'
import { theme } from '../theme/theme'

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppComponent />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
