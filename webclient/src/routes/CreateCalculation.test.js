import React from 'react'
import { Map } from 'immutable'
import configureStore from 'redux-mock-store'
import CreateCalculation from './CreateCalculation'

describe('CreateCalculation', () => {
  it('renders properly', () => {
    const initialState = Map()
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const wrapper = shallow(<CreateCalculation store={store} />)
    expect(wrapper.dive()).toMatchSnapshot()
  })


//  it('calls cC properly', () => {
//    const initialState = {}
//    const mockStore = configureStore()
//    const store = mockStore(initialState)
//    const wrapper = mount(<CreateCalculation store={store} />)
//    wrapper.props.createCalculation = jest.fn()
//    //wrapper.props.createCalculation({})
//    wrapper.find('input.submit').simulate('click', { preventDefault() {} })
//    expect(dispatch).toBeCalled()
//
//  })

})
