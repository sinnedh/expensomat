import React from 'react';
import ReactDOM from 'react-dom';
import ExpenseForm from './ExpenseForm';

it('renders without members', () => {
  const div = document.createElement('div');
  const onSubmit = (x) => {};
  ReactDOM.render(<ExpenseForm members={[]} onSubmit={onSubmit} />, div);
});

it('renders with members', () => {
  const div = document.createElement('div');
  const onSubmit = (x) => {};
  const members = {
    1: { id: 1, name: "Micha", },
    2: { id: 2, name: "Dennis", },
  }
  ReactDOM.render(<ExpenseForm members={members} onSubmit={onSubmit} />, div);
});
