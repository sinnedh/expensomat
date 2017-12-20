import { List, Map } from 'immutable'
import members from './members';

const item1 = Map({id: 1, name: 'Kalle'})
const item2 = Map({id: 2, name: 'Keek'})
const item3 = Map({id: 3, name: 'Werner'})
const item4 = Map({id: 4, name: 'Schlucke'})

const initialState = Map()
const testState1 = Map({1: item1})
const testState3 = Map({1: item1, 2: item2, 3: item3})
const testState4 = Map({1: item1, 2: item2, 3: item3, 4: item4})

describe('MEMBERS:*_FAILURE', () => {
  it('UNKNOWN_TYPE does not change state', () => {
    const action = {type: 'MEMBERS:UNKNOWN_TYPE'};
    expect(members(testState3, action)).toEqual(testState3);
  });

  it('LOAD_FAILURE does not change state', () => {
    const action = {type: 'MEMBERS:LOAD_FAILURE'};
    expect(members(testState3, action)).toEqual(testState3);
  });

  it('CREATE_FAILURE does not change state', () => {
    const action = {type: 'MEMBERS:CREATE_FAILURE'}
    expect(members(testState3, action)).toEqual(testState3);
  });

  it('DELETE_FAILURE does not change state', () => {
    const action = {type: 'MEMBERS:DELETE_FAILURE'};
    expect(members(testState3, action)).toEqual(testState3);
  });

  it('UPDATE_FAILURE does not change state', () => {
    const action = {type: 'MEMBERS:UPDATE_FAILURE'};
    expect(members(testState3, action)).toEqual(testState3);
  });
});

describe('MEMBERS:LOAD_SUCCESS', () => {
  const action = (items) => ({
    type: 'MEMBERS:LOAD_SUCCESS',
    items,
  });

  it('sets the members', () => {
    const items = [item1.toJS(), item2.toJS(), item3.toJS()]
    const beforeState = initialState;
    const afterState = testState3;

    expect(members(beforeState, action(items))).toEqual(afterState);
  });

  it('overwrites the existing members', () => {
    const items = [item1.toJS(), item2.toJS(), item3.toJS()]
    const beforeState = testState4;
    const afterState = testState3;

    expect(members(beforeState, action(items))).toEqual(afterState);
  });
});

describe('MEMBERS:CREATE_SUCCESS', () => {
  const action = (member) => ({
    type: 'MEMBERS:CREATE_SUCCESS',
    member,
  });

  it('adds the member to an empty item list', () => {
    const member = item1.toJS();
    const beforeState = initialState;
    const afterState = testState1

    expect(members(beforeState, action(member))).toEqual(afterState);
  });

  it('adds the member to existing items', () => {
    const member = item4.toJS();
    const beforeState = testState3;
    const afterState = testState4;

    expect(members(beforeState, action(member))).toEqual(afterState);
  });
});

describe('MEMBERS:DELETE_SUCCESS', () => {
  const action = {
    type: 'MEMBERS:DELETE_SUCCESS',
    id: 4,
  };

  it('deletes the members', () => {
    const beforeState = testState4;
    const afterState = testState3;

    expect(members(beforeState, action)).toEqual(afterState);
  });
});

describe('MEMBERS:UPDATE_SUCCESS', () => {
  const action = {
    type: 'MEMBERS:UPDATE_SUCCESS',
    id: 2,
    member: {id: 2, name: 'Dirk'}
  };

  it('updates the description of the member', () => {
    const beforeState = testState3;
    const newItem2 = Map({id: 2, name: 'Dirk'})
    const afterState = Map({1: item1, 2: newItem2, 3: item3});

    expect(members(beforeState, action)).toEqual(afterState);
  });
});
