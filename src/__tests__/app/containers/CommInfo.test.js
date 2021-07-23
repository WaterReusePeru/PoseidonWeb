import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import store from '../../../app/store'
import '../../../app/i18n/i18n'

import CommInfo from '../../../app/components/CommInfo'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders and provides a list of countries', () => {
  act(() => {
    render(
      <Provider store={store}>
        <CommInfo />
      </Provider>,
      container
    )
  })
  expect(container.textContent).toContain('Select the Country')
})
