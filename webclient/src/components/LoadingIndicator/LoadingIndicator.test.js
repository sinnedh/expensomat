import React from 'react'
import ReactDOM from 'react-dom'
import LoadingIndicator from './LoadingIndicator'

it('renders when isLoading', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoadingIndicator isLoading={true} />, div)
})

it('renders when not isLoading', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoadingIndicator isLoading={false} />, div)
})
