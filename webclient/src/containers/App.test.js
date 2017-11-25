import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const initialState = {notifications: {message: '', type: null}};
  const mockStore = configureStore();
  let store,container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<App store={store} />);
  });

  it('renders without crashing', () => {
    expect(container.length).toEqual(1);
  });
});
