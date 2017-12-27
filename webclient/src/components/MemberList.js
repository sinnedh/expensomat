import React from 'react';
import EditableInput from './EditableInput'

export default (props) => (
  <ul>
    {Object.keys(props.members).map((id) =>
      <li key={id}>
        <button onClick={(e) => props.onClickDelete(e, id)}>X</button>
        <EditableInput
          value={props.members[id].name}
          onClickSave={value => props.onUpdateName(id, value)}
          />
        <EditableInput
          value={props.members[id].role}
          onClickSave={value => props.onUpdateRole(id, value)}
          />
      </li>
    )}
  </ul>
)
