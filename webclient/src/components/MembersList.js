import React from 'react';

export default (props) => (
  <ul>
    {Object.keys(props.members).map((id) =>
      <li key={id}>{props.members[id].name}</li>
    )}
  </ul>
)
