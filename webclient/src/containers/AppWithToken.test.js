import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import AppWithToken from './AppWithToken';

describe('AppWithToken', () => {
  const initialState = {
    application: {
      token: null,
    },
  };
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
