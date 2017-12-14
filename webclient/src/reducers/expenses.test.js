import expenses from './expenses';

describe('EXPENSES:*_FAILURE', () => {
  const state = {items: [{id: 1, name: 'An item'}]};

  it('UNKNOWN_TYPE does not change state', () => {
    const action = {type: 'EXPENSES:UNKNOWN_TYPE'};
    expect(expenses(state, action)).toEqual(state);
  });

  it('LOAD_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:LOAD_FAILURE'};
    expect(expenses(state, action)).toEqual(state);
  });

  it('CREATE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:CREATE_FAILURE'}
    expect(expenses(state, action)).toEqual(state);
  });

  it('DELETE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:DELETE_FAILURE'};
    expect(expenses(state, action)).toEqual(state);
  });

  it('UPDATE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:UPDATE_FAILURE'};
    expect(expenses(state, action)).toEqual(state);
  });
});

describe('EXPENSES:LOAD_SUCCESS', () => {
  const action = (items) => ({
    type: 'EXPENSES:LOAD_SUCCESS',
    items,
  });

  it('sets the expenses', () => {
    const items = [{name: 'An item'}, {name: 'Another item'}];
    const beforeState = {items: []};
    const afterState = {items};

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });
});

describe('EXPENSES:CREATE_SUCCESS', () => {
  const action = (expense) => ({
    type: 'EXPENSES:CREATE_SUCCESS',
    expense,
  });

  it('adds the expense to an empty item list', () => {
    const expense = {name: 'A new item'};
    const beforeState = {items: []};
    const afterState = {items: [expense]};

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });

  it('adds the expense to existing items', () => {
    const expense = {name: 'A new item'};
    const beforeState = {items: [{name: 'An existing item'}]};
    const afterState = {items: [expense, {name: 'An existing item'}]};

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });
});

describe('EXPENSES:DELETE_SUCCESS', () => {
  const action = (items) => ({
    type: 'EXPENSES:DELETE_SUCCESS',
    id: 2,
  });

  it('deletes the expenses', () => {
    const items = [{name: 'An item'}, {name: 'Another item'}];
    const beforeState = {items: [{id: 1, name: 'An item'}, {id: 2, name: 'Another item'}, {id: 3, name: 'Yet one more item'}]};
    const afterState = {items: [{id: 1, name: 'An item'}, {id: 3, name: 'Yet one more item'}]};

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });
});

describe('EXPENSES:UPDATE_SUCCESS', () => {
  const action = (items) => ({
    type: 'EXPENSES:UPDATE_SUCCESS',
    id: 2,
    changes: {name: 'A new name'}
  });

  it('updates the description of the expense', () => {
    const items = [{name: 'An item'}, {name: 'Another item'}];
    const beforeState = {items: [{id: 1, name: 'An item'}, {id: 2, name: 'Another item'}, {id: 3, name: 'Yet one more item'}]};
    const afterState = {items: [{id: 1, name: 'An item'}, {id: 2, name: 'A new name'}, {id: 3, name: 'Yet one more item'}]};

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });
});
