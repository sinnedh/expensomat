import application from './application';

const initialState = {loadingCounter: 0};

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
