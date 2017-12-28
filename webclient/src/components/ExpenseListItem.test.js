import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import ExpenseListItem from './ExpenseListItem';

const expense = {
  paid_for: [{ name: "Dennis" }],
  paid_by: [{ name: "Micha" }, { name: "Achim" } ],
  description: "Pasta beim Italiener",
  amount: 800,
  paid_at: "2017-11-11 15:28",
}

describe('ExpenseListItem', () => {
  it('matches snapshot when canEditExpense=true', () => {
    const context = { token: 'ABCD1234', user: {canEditExpenses: true} }
    const wrapper = shallow(<ExpenseListItem expense={expense} />, {context})
    expect(wrapper).toMatchSnapshot()
  });

  it('matches snapshot when canEditExpense=false', () => {
    const context = { token: 'ABCD1234', user: {canEditExpenses: false} }
    const wrapper = shallow(<ExpenseListItem expense={expense} />, {context})
    expect(wrapper).toMatchSnapshot()
  });
})
