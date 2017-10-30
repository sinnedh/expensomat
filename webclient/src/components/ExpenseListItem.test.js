import React from 'react';
import ReactDOM from 'react-dom';
import ExpenseListItem from './ExpenseListItem';

it('renders with all params', () => {
  const div = document.createElement('div');
  const expense = {
    paid_for: [{ name: "Dennis" }],
    paid_by: [{ name: "Micha" }, { name: "Achim" } ],
    description: "Pasta beim Italiener",
    amount: 800,
    paid_at: "2017-11-11 15:28",
  }
  ReactDOM.render(<ExpenseListItem expense={expense} />, div);
});
