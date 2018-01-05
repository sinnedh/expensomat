import React from 'react'
import ReactDOM from 'react-dom'
import Forbidden from './Forbidden'

describe('Forbidden', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Forbidden />)
    expect(wrapper).toMatchSnapshot()
  })
})
