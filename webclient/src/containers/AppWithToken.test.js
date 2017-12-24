import React from 'react';
import { Map } from 'immutable'
import configureStore from 'redux-mock-store';
import AppWithToken from './AppWithToken';

describe('AppWithToken', () => {
  const initialState = Map({
    application: Map({
      token: null,
    }),
  });
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<AppWithToken store={store} />);
  });

  it('renders without crashing', () => {
    expect(container.length).toEqual(1);
  });
});
