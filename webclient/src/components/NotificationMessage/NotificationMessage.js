import React from 'react'

export default ({message, type}) => (
  message
   ? <p>{type}: {message}</p>
   : ''
)
