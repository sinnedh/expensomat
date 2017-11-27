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



describe('EXPENSES:CREATE_REQUEST', () => {
  const action = {type: 'EXPENSES:CREATE_REQUEST'};

  it('sets isFetching', () => {
    const beforeState = {items: [{name: 'an expense'}], isFetching: false};
    expect(expenses(beforeState, action).isFetching).toEqual(true);
  });
});

describe('EXPENSES:CREATE_FAILURE', () => {
  const action = {type: 'EXPENSES:CREATE_FAILURE'};

  it('resets isFetching', () => {
    const beforeState = {items: [{name: 'an expense'}], isFetching: true};
    expect(expenses(beforeState, action).isFetching).toEqual(false);
  });

  it('does not change the expenses', () => {
    const beforeState = {items: [{name: 'An item'}], isFetching: true};
    const afterState = {items: [{name: 'An item'}], isFetching: false};

    expect(expenses(beforeState, action)).toEqual(afterState);
  });
});

describe('EXPENSES:CREATE_SUCCESS', () => {
  const action = (expense) => ({
    type: 'EXPENSES:CREATE_SUCCESS',
    expense,
  });

  it('resets isFetching', () => {
    const beforeState = {items: [{name: 'an expense'}], isFetching: true};
    expect(expenses(beforeState, action({})).isFetching).toEqual(false);
  });

  it('adds the expense to an empty item list', () => {
    const expense = {name: 'A new item'};
    const beforeState = {items: [], isFetching: true};
    const afterState = {items: [expense], isFetching: false};

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });

  it('adds the expense to existing items', () => {
    const expense = {name: 'A new item'};
    const beforeState = {items: [{name: 'An existing item'}], isFetching: true};
    const afterState = {items: [expense, {name: 'An existing item'}], isFetching: false};

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });
});
