import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CalculationForm from './CalculationForm';

it('renders', () => {
  const div = document.createElement('div');
  const onSubmit = jest.fn();
  const wrapper = shallow(<CalculationForm handleSubmit={onSubmit} />)
  expect(wrapper).toMatchSnapshot()
})

it('calls onSubmit when submit button is clicked', () => {
  const div = document.createElement('div');
  const onSubmit = jest.fn();
  const wrapper = shallow(<CalculationForm handleSubmit={onSubmit} />)
  wrapper.find('input.submit').simulate('click', { preventDefault() {} })
  expect(onSubmit).toBeCalled()
})
