import React from 'react';
import {formatDate} from '../utils';

export default (props) => (
    <li>
      {formatDate(props.expense.paid_at)}&nbsp;
      <strong>{props.expense.description}</strong>:&nbsp;
      {props.expense.amount / 100} Euro
      paid by {props.expense.paid_by.map((m, i) => <span key={i}>{m.name}</span>)}
      &nbsp;for {props.expense.paid_for.map((m, i) => <span key={i}>{m.name}</span>)}
    </li>
)
