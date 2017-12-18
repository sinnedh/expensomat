import * as actions from './expenses'

describe('EXPENSES', () => {
  const token = 'ABCD123'
  const expense = {id: 1, name: 'Expense'}

  it('handles getExpenses', () => {
    const action = actions.getExpenses(token)
    expect(action).toMatchSnapshot()
  })

  it('handles createExpense', () => {
    const action = actions.createExpense(token, expense)
    expect(action).toMatchSnapshot()
  })

  it('handles deleteExpense', () => {
    const action = actions.deleteExpense(token, expense.id)
    expect(action).toMatchSnapshot()
  })

  it('handles updateExpense', () => {
    const action = actions.updateExpense(token, 11, {name: 'Expense'})
    expect(action).toMatchSnapshot()
  })
})
