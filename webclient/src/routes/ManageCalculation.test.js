import React from 'react'
import { List, Map } from 'immutable'
import configureStore from 'redux-mock-store'
import ManageCalculation from './ManageCalculation'

describe('ManageCalculation', () => {
  it('renders properly', () => {
    const initialState = Map({
      application: Map({ token: 'ABCD1234' }),
      calculations: Map({
        name: 'My calculation',
        description: 'Blabla',
      }),
      members: Map({
        1: Map({id: 1, name: 'A guy'}),
        2: Map({id: 2, name: 'Another guy'}),
      }),
    })
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const wrapper = shallow(
      <ManageCalculation
        match={{params: {token: 'ABCD1234'}}}
        store={store}
        />
    )
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
