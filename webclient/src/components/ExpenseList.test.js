import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import ExpenseList from './ExpenseList';

const expenses = [
  { description: "Pasta", amount: 800, paid_for: [], paid_by: [], paid_at: "2017-11-11 15:28"},
  { description: "Pizza", amount: 1200, paid_for: [], paid_by: [], paid_at: "2016-09-14 12:18"},
]

describe('ExpenseListItem', () => {
  it('renders when no expenses are given', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExpenseList expenses={[]} />, div);
  });

  it('matches snapshop when canEditExpenses=true', () => {
    const context = { user: {canEditExpenses: true} }
    const wrapper = shallow(<ExpenseList expenses={expenses} />, {context})
    expect(wrapper).toMatchSnapshot()
  });

  it('matches snapshop when canEditExpenses=false', () => {
    const context = { user: {canEditExpenses: false} }
    const wrapper = shallow(<ExpenseList expenses={expenses} />, {context})
    expect(wrapper).toMatchSnapshot()
  });
})
