import expenses from './expenses';

describe('EXPENSES:LOAD_REQUEST', () => {
  const action = {type: 'EXPENSES:LOAD_REQUEST'};

  it('sets isFetching', () => {
    const beforeState = {items: [], isFetching: false};
    const afterState = {items: [], isFetching: true};

    expect(expenses(beforeState, action)).toEqual(afterState);
  });
});

describe('EXPENSES:LOAD_FAILURE', () => {
  const action = {type: 'EXPENSES:LOAD_FAILURE'};

  it('resets isFetching', () => {
    const beforeState = {items: [], isFetching: true};
    const afterState = {items: [], isFetching: false};

    expect(expenses(beforeState, action)).toEqual(afterState);
  });

  it('does not change the expenses', () => {
    const beforeState = {items: [{name: 'An item'}], isFetching: true};
    const afterState = {items: [{name: 'An item'}], isFetching: false};

    expect(expenses(beforeState, action)).toEqual(afterState);
  });
});

describe('EXPENSES:LOAD_SUCCESS', () => {
  const action = (items) => ({
    type: 'EXPENSES:LOAD_SUCCESS',
    items,
  });

  it('resets isFetching', () => {
    const beforeState = {items: [], isFetching: true};
    const afterState = {items: [], isFetching: false};

    expect(expenses(beforeState, action([]))).toEqual(afterState);
  });

  it('sets the expenses', () => {
    const items = [{name: 'An item'}, {name: 'Another item'}];
    const beforeState = {items: [], isFetching: true};
    const afterState = {items, isFetching: false};

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });
});
