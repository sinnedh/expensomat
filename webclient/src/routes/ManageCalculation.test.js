import React from 'react'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import ManageCalculation from './ManageCalculation'

describe('ManageCalculation', () => {
  it('renders properly', () => {
    const initialState = {
      application: { token: 'ABCD1234' },
      calculations: {
        name: 'My calculation',
        description: 'Blabla',
        members: [{name: 'A guy'}, {name: 'Another guy'}]
      }
    }
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const wrapper = shallow(<ManageCalculation store={store} />)
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
