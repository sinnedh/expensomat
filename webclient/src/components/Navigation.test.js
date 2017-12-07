import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import Navigation from './Navigation';

it('renders with token', () => {
  const div = document.createElement('div');
  const component = (
    <MemoryRouter location="someLocation">
      <Navigation token={"1234"} />
    </MemoryRouter>
  )

  ReactDOM.render(component, div);
});
