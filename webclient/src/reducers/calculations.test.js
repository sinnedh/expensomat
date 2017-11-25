import calculations from './calculations';

describe('CALCULATION:LOAD_EXPENSES_REQUEST', () => {
  const action = {type: 'CALCULATION:LOAD_EXPENSES_REQUEST'};

  it('sets isFetching', () => {
    const beforeState = {expenses: [], isFetching: false};
    const afterState = {expenses: [], isFetching: true};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:LOAD_EXPENSES_FAILURE', () => {
  const action = {type: 'CALCULATION:LOAD_EXPENSES_FAILURE'};

  it('resets isFetching', () => {
    const beforeState = {expenses: [], isFetching: true};
    const afterState = {expenses: [], isFetching: false};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });

  it('does not change the expenses', () => {
    const beforeState = {expenses: [{name: 'An item'}], isFetching: true};
    const afterState = {expenses: [{name: 'An item'}], isFetching: false};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:LOAD_EXPENSES_SUCCESS', () => {
  const action = (expenses) => ({
    type: 'CALCULATION:LOAD_EXPENSES_SUCCESS',
    expenses,
  });

  it('resets isFetching', () => {
    const beforeState = {expenses: [], isFetching: true};
    const afterState = {expenses: [], isFetching: false};

    expect(calculations(beforeState, action([]))).toEqual(afterState);
  });

  it('sets the expenses', () => {
    const expenses = [{name: 'An item'}, {name: 'Another item'}];
    const beforeState = {expenses: [], isFetching: true};
    const afterState = {expenses, isFetching: false};

    expect(calculations(beforeState, action(expenses))).toEqual(afterState);
  });
});
