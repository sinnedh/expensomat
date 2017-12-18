import { List, Map } from 'immutable'
import expenses from './expenses';

const item1 = Map({id: 1, name: 'An item'})
const item2 = Map({id: 2, name: 'Another item'})
const item3 = Map({id: 3, name: 'Yet one more item'})
const item4 = Map({id: 4, name: 'A new item'})

const initialState = Map()
const testState1 = Map({1: item1})
const testState3 = Map({1: item1, 2: item2, 3: item3})
const testState4 = Map({1: item1, 2: item2, 3: item3, 4: item4})

describe('EXPENSES:*_FAILURE', () => {
  it('UNKNOWN_TYPE does not change state', () => {
    const action = {type: 'EXPENSES:UNKNOWN_TYPE'};
    expect(expenses(testState3, action)).toEqual(testState3);
  });

  it('LOAD_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:LOAD_FAILURE'};
    expect(expenses(testState3, action)).toEqual(testState3);
  });

  it('CREATE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:CREATE_FAILURE'}
    expect(expenses(testState3, action)).toEqual(testState3);
  });

  it('DELETE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:DELETE_FAILURE'};
    expect(expenses(testState3, action)).toEqual(testState3);
  });

  it('UPDATE_FAILURE does not change state', () => {
    const action = {type: 'EXPENSES:UPDATE_FAILURE'};
    expect(expenses(testState3, action)).toEqual(testState3);
  });
});

describe('EXPENSES:LOAD_SUCCESS', () => {
  const action = (items) => ({
    type: 'EXPENSES:LOAD_SUCCESS',
    items,
  });

  it('sets the expenses', () => {
    const items = [item1.toJS(), item2.toJS(), item3.toJS()]
    const beforeState = initialState;
    const afterState = testState3;

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });

  it('overwrites the existing expenses', () => {
    const items = [item1.toJS(), item2.toJS(), item3.toJS()]
    const beforeState = testState4;
    const afterState = testState3;

    expect(expenses(beforeState, action(items))).toEqual(afterState);
  });
});

describe('EXPENSES:CREATE_SUCCESS', () => {
  const action = (expense) => ({
    type: 'EXPENSES:CREATE_SUCCESS',
    expense,
  });

  it('adds the expense to an empty item list', () => {
    const expense = item1.toJS();
    const beforeState = initialState;
    const afterState = testState1

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });

  it('adds the expense to existing items', () => {
    const expense = item4.toJS();
    const beforeState = testState3;
    const afterState = testState4;

    expect(expenses(beforeState, action(expense))).toEqual(afterState);
  });
});

describe('EXPENSES:DELETE_SUCCESS', () => {
  const action = {
    type: 'EXPENSES:DELETE_SUCCESS',
    id: 4,
  };

  it('deletes the expenses', () => {
    const beforeState = testState4;
    const afterState = testState3;

    expect(expenses(beforeState, action)).toEqual(afterState);
  });
});

describe('EXPENSES:UPDATE_SUCCESS', () => {
  const action = {
    type: 'EXPENSES:UPDATE_SUCCESS',
    id: 2,
    expense: {id: 2, name: 'A new name'}
  };

  it('updates the description of the expense', () => {
    const beforeState = testState3;
    const newItem2 = Map({id: 2, name: 'A new name'})
    const afterState = Map({1: item1, 2: newItem2, 3: item3});

    expect(expenses(beforeState, action)).toEqual(afterState);
  });
});
