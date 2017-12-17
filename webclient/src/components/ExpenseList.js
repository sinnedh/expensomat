import React from 'react';
import ExpenseListItem from './ExpenseListItem'

export default (props) => (
  <ul>
    {Object.keys(props.expenses).map((id) =>
      <ExpenseListItem
        key={id}
        expense={props.expenses[id]}
        onClickDelete={props.onClickDelete}
        />
      )
    }
  </ul>
)
