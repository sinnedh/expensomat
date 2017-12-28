import { Map } from 'immutable'
import application from './application';

const initialState = Map({
  loadingCounter: 0,
  notificationText: null,
  notificationType: null,
  token: null,
  user: null,
});

describe('APPLICATION:SET_USER', () => {
  const user = {name: 'Keek', role: 'admin'};
  const action = {type: 'APPLICATION:SET_USER', user};

  it('sets the user', () => {
    const beforeState = initialState
    const afterState = initialState.merge({'user': Map(user)})

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:RESET_USER', () => {
  const action = {type: 'APPLICATION:RESET_USER'};

  it('resets the user', () => {
    const user = {name: 'Keek', role: 'admin'};
    const beforeState = initialState.merge({user: Map(user), token: 'ABC'})
    const afterState = initialState.merge({token: 'ABC'})

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:SET_TOKEN', () => {
  const token = 'ABCD1234';
  const action = {type: 'APPLICATION:SET_TOKEN', token};

  it('increments counter when is 0', () => {
    const beforeState = initialState
    const afterState = initialState.update('token', t => token)

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:INCREMENT_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:INCREMENT_LOADING_COUNTER'};

  it('increments counter when is 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 0)
    const afterState = initialState.update('loadingCounter', _ => 1)

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('increments counter when is larger than 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 55)
    const afterState = initialState.update('loadingCounter', _ => 56)

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:DECREMENT_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:DECREMENT_LOADING_COUNTER'};

  it('does not decrement counter when is 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 0)
    const afterState = initialState.update('loadingCounter', _ => 0)

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('decrements counter to 0 when is 1', () => {
    const beforeState = initialState.update('loadingCounter', _ => 1)
    const afterState = initialState.update('loadingCounter', _ => 0)

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('decrements counter when is larger than 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 55)
    const afterState = initialState.update('loadingCounter', _ => 54)

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:RESET_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:RESET_LOADING_COUNTER'};

  it('does reset counter when is 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 0)
    const afterState = initialState.update('loadingCounter', _ => 0)

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('does reset counter when is larger than 0', () => {
    const beforeState = initialState.update('loadingCounter', _ => 55)
    const afterState = initialState.update('loadingCounter', _ => 0)

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:NOTIFICATION_RESET', () => {
  const action = {type: 'APPLICATION:NOTIFICATION_RESET'};

  it('resets to initial state', () => {
    const beforeState = initialState.merge({
      notificationText: 'Hello world',
      notificationType: 'something',
    })
    const afterState = initialState;

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('does not change other state properties', () => {
    const beforeState = initialState.merge({
      user: {name: 'Keek', role: 'admin'},
      token: 'ABCD1234'
    })
    const afterState = beforeState;

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:NOTIFICATION_SET', () => {
  const testCases = [
    initialState.merge({type: 'error', text: 'Something went wrong.'}),
    initialState.merge({type: 'warning', text: 'Something could go wrong.'}),
    initialState.merge({type: 'success', text: 'Something succeeded.'}),
    initialState.merge({type: 'info', text: 'Something happened.'}),
  ];

  for (const testCase of testCases) {
    it(testCase.get('type').toUpperCase() + ' sets text and type', () => {
      const action = {
        type: 'APPLICATION:NOTIFICATION_SET',
        notificationType: testCase.get('type'),
        notificationText: testCase.get('text'),
      };

      const beforeState = initialState.merge({notificationText: 'Hello world', notificationType: 'something'});
      const afterState = initialState.merge({notificationText: testCase.get('text'), notificationType: testCase.get('type')});

      expect(application(beforeState, action)).toEqual(afterState);
    });
  }
});
