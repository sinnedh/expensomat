import React from 'react';
import ReactDOM from 'react-dom';
import MemberList from './MemberList';

it('renders without members', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemberList members={{}} />, div);
});

it('renders with members', () => {
  const div = document.createElement('div');
  const members = {
    1: { id: 1, name: "Micha", role: "admin"},
    2: { id: 2, name: "Dennis", role: "editor"},
  }
  ReactDOM.render(<MemberList members={members} />, div);
});
