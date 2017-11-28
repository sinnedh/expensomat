import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without notification', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      loadingCounter={0}
    />, div);
});

it('renders with empty notification', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      notificationMessage={''}
      notificationType={null}
      loadingCounter={0}
    />, div);
});

it('renders with notification', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      notificationMessage={'A message'}
      notificationType={'warning'}
      loadingCounter={0}
    />, div);
});
