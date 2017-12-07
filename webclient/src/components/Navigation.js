import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <ul>
      <li><Link to="/calculation">Create new calculation</Link></li>
      <li><Link to={`/calculation/${props.token}`}>Show calculation</Link></li>
      <li><Link to={`/calculation/${props.token}/manage`}>Manage calculation</Link></li>
    </ul>
  )
}
