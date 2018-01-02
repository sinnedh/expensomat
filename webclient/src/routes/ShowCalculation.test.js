import React from 'react'
import { List, Map } from 'immutable'
import configureStore from 'redux-mock-store'
import ShowCalculation from './ShowCalculation'

const initialState = (canEditExpenses) => (
  Map({
    application: Map({
      token: 'ABCD1234',
      user: Map({canEditExpenses})
    }),
    calculations: Map({
      name: 'My calculation',
      description: 'Blabla',
      matrix: Map(),
    }),
    members: Map({
      1: Map({id: 1, name: 'A guy'}),
      2: Map({id: 2, name: 'Another guy'}),
    }),
    expenses: Map({
      1: Map({id: 1, description: 'Expense 1', amount: 999, paid_at: '2017-11-11'}),
      2: Map({id: 2, description: 'Expense 2', amount: 1599, paid_at: '2016-12-08'}),
    })
  })
)

describe('ShowCalculation', () => {
  it('matches snapshot when canEditExpenses is true', () => {
    const mockStore = configureStore()
    const store = mockStore(initialState(true))
    const wrapper = shallow(
      <ShowCalculation  store={store} match={{params: {token: 'ABCD1234'}}} />
    )
    expect(wrapper.dive()).toMatchSnapshot()
  })

  it('matches snapshot when canEditExpenses is false', () => {
    const mockStore = configureStore()
    const store = mockStore(initialState(false))
    const wrapper = shallow(
      <ShowCalculation  store={store} match={{params: {token: 'ABCD1234'}}} />
    )
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
