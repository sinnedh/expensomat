import React from 'react';

export default (props) => (
  <ul>
    {props.members.map((m, i) =>
      <li key={i}>{m.name}</li>
    )}
  </ul>
)
