import React from 'react';
import EditableInput from './EditableInput'

export default (props) => (
  <ul>
    {Object.keys(props.members).map((id) =>
      <li key={id}>
        <button onClick={(e) => props.onClickDelete(e, id)}>X</button>
        <EditableInput
          value={props.members[id].name}
          onClickSave={value => this.props.onUpdateMember(id, value)}
          />
      </li>
    )}
  </ul>
)
