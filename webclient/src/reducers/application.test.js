import application from './application';

const initialState = {loadingCounter: 0, message: null, type: null};

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
    const beforeState = {...initialState, message: 'Hello world', type: 'something'};
    const afterState = initialState;

    expect(application(beforeState, action)).toEqual(afterState);
  });
});

describe('APPLICATION:NOTIFICATION_SET', () => {
  const testCases = [
    {...initialState, type: 'error', message: 'Something went wrong.'},
    {...initialState, type: 'warning', message: 'Something could have gone wrong.'},
    {...initialState, type: 'success', message: 'Something succeeded.'},
    {...initialState, type: 'info', message: 'Something happened.'},
  ];

  for (const testCase of testCases) {
    it(testCase.type.toUpperCase() + ' sets message and type', () => {
      const action = {
        type: 'APPLICATION:NOTIFICATION_SET',
        notificationType: testCase.type,
        message: testCase.message,
      };

      const beforeState = {...initialState, message: 'Hello world', type: 'something'};
      const afterState = {...initialState, message: testCase.message, type: testCase.type};

      expect(application(beforeState, action)).toEqual(afterState);
    });
  }
});
