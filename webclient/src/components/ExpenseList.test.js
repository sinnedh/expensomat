import React from 'react';
import ReactDOM from 'react-dom';
import ExpenseList from './ExpenseList';

it('renders without expenses', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExpenseList expenses={[]} />, div);
});

it('renders with expenses', () => {
  const div = document.createElement('div');
  const expenses = [
    { description: "Pasta", amount: 800, paid_for: [], paid_by: [], },
    { description: "Pizza", amount: 1200, paid_for: [], paid_by: [], },
  ]
  ReactDOM.render(<ExpenseList expenses={expenses} />, div);
});
