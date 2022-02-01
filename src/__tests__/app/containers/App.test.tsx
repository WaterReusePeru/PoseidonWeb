import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../../../app'
import { Provider } from 'react-redux'
import store from '../../../app/store'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}))

it('renders without crashing', () => {
  const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const div = document.createElement('div')
  ReactDOM.render(<Root />, div)
  ReactDOM.unmountComponentAtNode(div)
})
