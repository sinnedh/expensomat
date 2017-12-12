import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navigation = (props, context) => {
  return (
    <ul>
      <li><Link to="/calculation">Create new calculation</Link></li>
      <li><Link to={`/calculation/${props.token}`}>Show calculation</Link></li>
      <li><Link to={`/calculation/${props.token}/manage`}>Manage calculation</Link></li>
    </ul>
  )
}

Navigation.contextTypes = {token: PropTypes.string}

export default Navigation
