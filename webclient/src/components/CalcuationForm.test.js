import React from 'react';
import ReactDOM from 'react-dom';
import CalculationForm from './CalculationForm';

it('renders', () => {
  const div = document.createElement('div');
  const onSubmit = (x) => {};
  ReactDOM.render(<CalculationForm onSubmit={onSubmit} />, div);
});
