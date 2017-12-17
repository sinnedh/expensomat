import React from 'react'
import { Map } from 'immutable'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import EditExpense from './EditExpense'

describe('EditExpense', () => {
  it('renders properly', () => {
    const initialState = Map({
      application: Map({ token: 'ABCD1234' }),
      expenses: Map({
        1: Map({id: 1, description: 'Expense 1', amount: 999, paid_at: '2017-11-11'}),
        2: Map({id: 2, description: 'Expense 2', amount: 1599, paid_at: '2016-12-08'}),
      })
    })
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const wrapper = shallow(<EditExpense match={{params: {id: 1}}} store={store} />)
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
