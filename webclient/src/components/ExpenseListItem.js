import React from 'react';
import {formatDate} from '../utils';
import {formatAmount} from '../utils';

export default (props) => (
    <li>
      {formatDate(props.expense.paid_at)}:
      { } <strong>{props.expense.description}</strong>
      { } {formatAmount(props.expense.amount)}
      { } paid by {props.expense.paid_by.map((m, i) => <span key={i}>{m.name}</span>)}
      { } for {props.expense.paid_for.map((m, i) => <span key={i}>{m.name}</span>)}
    </li>
)
