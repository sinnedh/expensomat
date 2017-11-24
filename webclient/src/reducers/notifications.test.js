import notifications from './notifications';

describe('NOTIFICATION_RESET', () => {
  const initialState = {message: '', type: null}
  const action = {type: 'NOTIFICATION_RESET'};

  it('resets to initial state', () => {
    const beforeState = {message: 'Hello world', type: 'something'};
    const afterState = initialState;

    expect(notifications(beforeState, action)).toEqual(afterState);
  });
});

describe('NOTIFICATION_SET_', () => {
  const testCases = [
    {type: 'error', message: 'Something went wrong.'},
    {type: 'warning', message: 'Something could have gone wrong.'},
    {type: 'success', message: 'Something succeeded.'},
    {type: 'info', message: 'Something happened.'},
  ];

  for (const testCase of testCases) {
    it(testCase.type.toUpperCase() + ' sets message and type', () => {
      const action = {
        type: 'NOTIFICATION_SET_' + testCase.type.toUpperCase(),
        message: testCase.message,
      };

      const beforeState = {message: 'Hello world', type: 'something'};
      const afterState = testCase;

      expect(notifications(beforeState, action)).toEqual(afterState);
    });
  }
});
