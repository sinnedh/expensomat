import application from './application';

const initialState = {
  loadingCounter: 0,
  notificationText: null,
  notificationType: null,
  token: null,
};

describe('APPLICATION:SET_TOKEN', () => {
  const token = 'ABCD1234';
  const action = {type: 'APPLICATION:SET_TOKEN', token};

  it('increments counter when is 0', () => {
    const beforeState = {...initialState};
    const afterState = {...initialState, token};

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:INCREMENT_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:INCREMENT_LOADING_COUNTER'};

  it('increments counter when is 0', () => {
    const beforeState = {...initialState, loadingCounter: 0};
    const afterState = {...initialState, loadingCounter: 1};

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('increments counter when is larger than 0', () => {
    const beforeState = {...initialState, loadingCounter: 55};
    const afterState = {...initialState, loadingCounter: 56};

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:DECREMENT_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:DECREMENT_LOADING_COUNTER'};

  it('does not decrement counter when is 0', () => {
    const beforeState = {...initialState, loadingCounter: 0};
    const afterState = {...initialState, loadingCounter: 0};

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('decrements counter to 0 when is 1', () => {
    const beforeState = {...initialState, loadingCounter: 1};
    const afterState = {...initialState, loadingCounter: 0};

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('decrements counter when is larger than 0', () => {
    const beforeState = {...initialState, loadingCounter: 55};
    const afterState = {...initialState, loadingCounter: 54};

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:RESET_LOADING_COUNTER', () => {
  const action = {type: 'APPLICATION:RESET_LOADING_COUNTER'};

  it('does reset counter when is 0', () => {
    const beforeState = {...initialState, loadingCounter: 0};
    const afterState = {...initialState, loadingCounter: 0};

    expect(application(beforeState, action)).toEqual(afterState);
  });

  it('does reset counter when is larger than 0', () => {
    const beforeState = {...initialState, loadingCounter: 55};
    const afterState = {...initialState, loadingCounter: 0};

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:NOTIFICATION_RESET', () => {
  const action = {type: 'APPLICATION:NOTIFICATION_RESET'};

  it('resets to initial state', () => {
    const beforeState = {
      ...initialState,
      notificationText: 'Hello world',
      notificationType: 'something',
    };
    const afterState = initialState;

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:NOTIFICATION_SET', () => {
  const testCases = [
    {...initialState, type: 'error', text: 'Something went wrong.'},
    {...initialState, type: 'warning', text: 'Something could go wrong.'},
    {...initialState, type: 'success', text: 'Something succeeded.'},
    {...initialState, type: 'info', text: 'Something happened.'},
  ];

  for (const testCase of testCases) {
    it(testCase.type.toUpperCase() + ' sets text and type', () => {
      const action = {
        type: 'APPLICATION:NOTIFICATION_SET',
        notificationType: testCase.type,
        notificationText: testCase.text,
      };

      const beforeState = {...initialState, notificationText: 'Hello world', notificationType: 'something'};
      const afterState = {...initialState, notificationText: testCase.text, notificationType: testCase.type};

      expect(application(beforeState, action)).toEqual(afterState);
    });
  }
});
