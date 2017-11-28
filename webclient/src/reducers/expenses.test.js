import expenses from './expenses';

describe('EXPENSES:LOAD_FAILURE', () => {
  const action = {type: 'EXPENSES:LOAD_FAILURE'};

  it('does not change the expenses', () => {
    const beforeState = {items: [{name: 'An item'}]};
    const afterState = {items: [{name: 'An item'}]};

    expect(expenses(beforeState, action)).toEqual(afterState);
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



describe('EXPENSES:CREATE_FAILURE', () => {
  const action = {type: 'EXPENSES:CREATE_FAILURE'};

  it('does not change the expenses', () => {
    const beforeState = {items: [{name: 'An item'}]};
    const afterState = {items: [{name: 'An item'}]};

    expect(expenses(beforeState, action)).toEqual(afterState);
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
