import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {formatDate} from '../utils';
import {formatAmount} from '../utils';

const ExpenseListItem = (props, context) => (
  <li>
    {context.user.canEditExpenses &&
      <button onClick={(e) => props.onClickDelete(e, props.expense)}>X</button>
    }
    {formatDate(props.expense.paid_at)}:
    { } <strong>{props.expense.description}</strong>
    { } {formatAmount(props.expense.amount)}
    { } paid by {props.expense.paid_by.map((m, i) => <span key={i}>{m.name}</span>)}
    { } for {props.expense.paid_for.map((m, i) => <span key={i}>{m.name}</span>)}
    <Link to={`/calculation/${context.token}/expense/${props.expense.id}`}>
      Details
    </Link>
  </li>
)

ExpenseListItem.contextTypes = {
  token: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    canEditExpenses: PropTypes.bool,
  }),
};

export default ExpenseListItem
