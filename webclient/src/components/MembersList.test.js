import React from 'react';
import ReactDOM from 'react-dom';
import MembersList from './MembersList';

it('renders without members', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MembersList members={[]} />, div);
});

it('renders with members', () => {
  const div = document.createElement('div');
  const members = [
    { name: "Micha", },
    { name: "Dennis", },
  ]
  ReactDOM.render(<MembersList members={members} />, div);
});
