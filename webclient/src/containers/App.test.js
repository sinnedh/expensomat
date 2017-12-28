import React from 'react';
import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import App from './App';

describe('App', () => {
  const initialState = Map({
    application: Map({
      loadingCounter: 0,
      notificationText: null,
      notificationType: null,
      token: null,
      user: Map(),
    }),
  });
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<App store={store} />);
  });

  it('renders without crashing', () => {
    expect(container.length).toEqual(1);
  });
});
