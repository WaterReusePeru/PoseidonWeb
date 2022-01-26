import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import '../../../app/i18n/i18n'

import GeneralReference from '../../../app/learn/GeneralReference'

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

it('renders and provides a title', () => {
  act(() => {
    render(<GeneralReference />, container)
  })
  expect(container.textContent).toContain('General Reference')
})
