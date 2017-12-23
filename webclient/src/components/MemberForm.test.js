import React from 'react';
import ReactDOM from 'react-dom';
import MemberForm from './MemberForm';

it('renders', () => {
  const div = document.createElement('div');
  const onSubmit = (x) => {};
  ReactDOM.render(<MemberForm onSubmit={onSubmit} />, div);
});
