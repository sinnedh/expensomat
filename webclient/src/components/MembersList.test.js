import React from 'react';
import ReactDOM from 'react-dom';
import MembersList from './MembersList';

it('renders without members', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MembersList members={{}} />, div);
});

it('renders with members', () => {
  const div = document.createElement('div');
  const members = {
    1: { id: 1, name: "Micha", },
    2: { id: 2, name: "Dennis", },
  }
  ReactDOM.render(<MembersList members={members} />, div);
});
