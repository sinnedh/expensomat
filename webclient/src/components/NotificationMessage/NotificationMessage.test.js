import React from 'react'
import ReactDOM from 'react-dom'
import NotificationMessage from './NotificationMessage'

it('renders with text and with type', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <NotificationMessage text={'This is a message'} type={'info'} />,
    div
  )
})

it('renders with type and without text', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NotificationMessage type={'info'} />, div)
})

it('renders without type and text', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NotificationMessage />, div)
})
