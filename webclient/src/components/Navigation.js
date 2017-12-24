import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navigation = (props, context) => {
  if (props.token) {
    return (
      <ul>
        <li><Link to={`/calculation/${props.token}`}>Show calculation</Link></li>
        <li><Link to={`/calculation/${props.token}/manage`}>Manage calculation</Link></li>
      </ul>
    )
  } else {
    return <ul></ul>
  }
}

Navigation.contextTypes = {token: PropTypes.string}

export default Navigation
