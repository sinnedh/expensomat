import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navigation = (props, context) => {
  if (props.token && props.user != null) {
    return (
      <ul>
        <li>Hello {props.user.name}!</li>

        <li>
          <Link to={`/calculation/${props.token}`}>Show calculation</Link>
        </li>

        {props.user.role === 'admin' &&
          <li>
            <Link to={`/calculation/${props.token}/manage`}>
              Manage calculation
            </Link>
          </li>
        }
      </ul>
    )
  } else {
    return <ul></ul>
  }
}

Navigation.contextTypes = {token: PropTypes.string}

export default Navigation
