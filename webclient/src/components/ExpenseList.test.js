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
    { description: "Pasta", amount: 800, paid_for: [], paid_by: [], paid_at: "2017-11-11 15:28"},
    { description: "Pizza", amount: 1200, paid_for: [], paid_by: [], paid_at: "2016-09-14 12:18"},
  ]
  ReactDOM.render(<ExpenseList expenses={expenses} />, div);
});
