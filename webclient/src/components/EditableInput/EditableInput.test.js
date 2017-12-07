import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import EditableInput from './EditableInput'

it('renders when in show mode', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EditableInput value={"Hallo"} />, div)
})

it('shows edit mode when edit button is clicked', () => {
  const wrapper = shallow(<EditableInput value={"Hello"} />)
  wrapper.find('input.edit-button').simulate('click', { preventDefault() {} })
  expect(wrapper.find('input.value')).toHaveLength(1)
})

it('leaves edit mode when cancel button is clicked', () => {
  const wrapper = shallow(<EditableInput value={"Hello"} />)
  wrapper.setState({editMode: true})
  wrapper.find('input.cancel-button').simulate('click', { preventDefault() {} })
  expect(wrapper.find('input.value')).toHaveLength(0)
})

it('save button calls onClickSave with input value', () => {
  const onClickSave = jest.fn();
  const wrapper = shallow(
    <EditableInput onClickSave={onClickSave} value={"Hello"} />
  )

  wrapper.setState({editMode: true})
  wrapper.find('input.save-button').simulate('click', { preventDefault() {} })
  expect(onClickSave).toBeCalledWith('Hello')
  expect(wrapper.find('input.value')).toHaveLength(0)
})
