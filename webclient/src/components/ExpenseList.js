import React from 'react';

export default (props) => (
  <ul>
    {props.expenses.map((e, i) =>
      <li key={i}><strong>{e.description}</strong>: {e.amount / 100} Euro</li>
    )}
  </ul>
)
