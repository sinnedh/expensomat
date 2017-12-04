import React from 'react';
import ExpenseListItem from './ExpenseListItem'

export default (props) => (
  <ul>
    {props.expenses.map(
      (e, i) => <ExpenseListItem
        key={i}
        expense={e}
        onClickDelete={props.onClickDelete}
        />
      )
    }
  </ul>
)
