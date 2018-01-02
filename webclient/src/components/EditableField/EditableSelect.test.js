import React from 'react'
import ReactDOM from 'react-dom'
import EditableSelect from './EditableSelect'

const options = {hello: "Hallo", ciao: "Ciao"}

it('matches snapshot when in show mode', () => {
  const wrapper = shallow(<EditableSelect value={"hello"} options={options} />)
  wrapper.setState({editMode: false})
  expect(wrapper).toMatchSnapshot()
})

it('matches snapshot when in edit mode', () => {
  const wrapper = shallow(<EditableSelect value={"ciao"}  options={options} />)
  wrapper.setState({editMode: true})
  expect(wrapper).toMatchSnapshot()
})

it('matches snapshot when not isEditable', () => {
  const wrapper = shallow(<EditableSelect value={"hello"} options={options} isEditable={false} />)
  expect(wrapper).toMatchSnapshot()
})

it('calls onUpdateInput when input is updated', () => {
  const wrapper = shallow(<EditableSelect value={"hello"} options={options} />)
  wrapper.setState({editMode: true})
  wrapper.find('select.value').simulate('change', { target: { value: 'ciao' } })
  expect(wrapper.state('editValue')).toBe('ciao')
})

it('shows edit mode when edit button is clicked', () => {
  const wrapper = shallow(<EditableSelect value={"Hello"} options={options} />)
  wrapper.find('input.edit-button').simulate('click', { preventDefault() {} })
  expect(wrapper.find('select.value')).toHaveLength(1)
  expect(wrapper.state('editMode')).toBe(true)
})

it('leaves edit mode when cancel button is clicked', () => {
  const wrapper = shallow(<EditableSelect value={"Hello"} options={options} />)
  wrapper.setState({editMode: true})
  wrapper.find('input.cancel-button').simulate('click', { preventDefault() {} })
  expect(wrapper.find('select.value')).toHaveLength(0)
  expect(wrapper.state('editMode')).toBe(false)
})

it('save button calls onClickSave with input value', () => {
  const onClickSave = jest.fn()
  const wrapper = shallow(
    <EditableSelect
      onClickSave={onClickSave}
      value={"hello"}
      options={options}
    />
  )

  wrapper.setState({editMode: true})
  wrapper.find('input.save-button').simulate('click', { preventDefault() {} })
  expect(onClickSave).toBeCalledWith('hello')
  expect(wrapper.find('select.value')).toHaveLength(0)
})
