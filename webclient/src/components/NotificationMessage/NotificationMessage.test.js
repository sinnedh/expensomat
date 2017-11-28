import React from 'react'
import ReactDOM from 'react-dom'
import NotificationMessage from './NotificationMessage'

it('renders with message and with type', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <NotificationMessage message={'This is a message'} type={'info'} />,
    div
  )
})

it('renders with type and without message', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NotificationMessage type={'info'} />, div)
})

it('renders without type and message', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NotificationMessage />, div)
})
