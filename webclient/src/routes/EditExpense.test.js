import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import EditExpense from './EditExpense'

describe('EditExpense', () => {
  it('renders properly', () => {
    const initialState = {
      application: { token: 'ABCD1234' },
      expenses: {
        items: [
          {id: 1, description: 'Expense 1', amount: 999, paid_at: '2017-11-11'},
          {id: 2, description: 'Expense 2', amount: 1599, paid_at: '2016-12-08'}
        ]
      }
    }
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const wrapper = shallow(<EditExpense match={{params: {id: 1}}} store={store} />)
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
