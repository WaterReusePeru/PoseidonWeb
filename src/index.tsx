import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import store from './app/store'
import { Provider } from 'react-redux'
import './app/i18n/i18n'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement) // Create a root.
  root.render(<Root />) // Render your app.
}