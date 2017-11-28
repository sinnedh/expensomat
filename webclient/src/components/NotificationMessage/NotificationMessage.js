import React from 'react'

export default ({text, type}) => (
  text
   ? <p>{type}: {text}</p>
   : ''
)
