import React from 'react'
import { List, Map } from 'immutable'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import ManageCalculation from './ManageCalculation'

describe('ManageCalculation', () => {
  it('renders properly', () => {
    const initialState = Map({
      application: Map({ token: 'ABCD1234' }),
      calculations: Map({
        name: 'My calculation',
        description: 'Blabla',
        members: List([{name: 'A guy'}, {name: 'Another guy'}]),
      })
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
