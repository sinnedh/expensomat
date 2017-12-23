import React from 'react';
import ReactDOM from 'react-dom';
import ExpenseMatrix from './ExpenseMatrix';

it('renders without elements', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExpenseMatrix elements={[]} />, div);
});

it('renders with elements', () => {
  const div = document.createElement('div');
  const elements = {
    "30_29": 4150.0,
    "29_30": 1278.0,
  }
  const members = {
    29: { id: 29, name: "Micha", },
    30: { id: 30, name: "Dennis", },
  }
  ReactDOM.render(<ExpenseMatrix elements={elements} members={members} />, div);
});
