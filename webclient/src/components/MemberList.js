import React from 'react';
import { EditableInput, EditableSelect } from './EditableField'

const roleOptions = {
  admin: 'Admin',
  editor: 'Editor',
  observer: 'Observer',
}
// TODO: move to central config
export { roleOptions }

export default (props) => (
  <ul>
    {Object.keys(props.members).map((id) =>
      <li key={id}>
        <button onClick={(e) => props.onClickDelete(e, id)}>X</button>
        <EditableInput
          value={props.members[id].name}
          onClickSave={value => props.onUpdateName(id, value)}
          />
        <EditableSelect
          value={props.members[id].role}
          options={roleOptions}
          onClickSave={value => props.onUpdateRole(id, value)}
          />
      </li>
    )}
  </ul>
)
