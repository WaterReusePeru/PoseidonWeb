import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import store from './app/store'
import { Provider } from 'react-redux'

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
