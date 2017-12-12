import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import AppWithToken from './AppWithToken'

it('renders with token', () => {
  const div = document.createElement('div')
  const onComponentDidMount = jest.fn()
  ReactDOM.render(
    <MemoryRouter location="someLocation">
      <AppWithToken token={'123'} onComponentDidMount={onComponentDidMount} />
    </MemoryRouter>, div)

  expect(onComponentDidMount).toHaveBeenCalledTimes(1)
})