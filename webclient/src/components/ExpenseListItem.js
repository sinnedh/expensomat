import React from 'react';

export default (props) => (
    <li>
      <strong>{props.expense.description}</strong>:&nbsp;
      {props.expense.amount / 100} Euro
      paid by {props.expense.paid_by.map((m, i) => <span key={i}>{m.name}</span>)}
      &nbsp;for {props.expense.paid_for.map((m, i) => <span key={i}>{m.name}</span>)}
    </li>
)
