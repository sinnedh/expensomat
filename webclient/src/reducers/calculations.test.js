import { List, Map } from 'immutable'
import calculations from './calculations';

const initialState = Map({name: '', description: '', members: List([]), matrix: Map({})});

describe('CALCULATION:*_FAILURE', () => {
  const state = Map({name: 'A calculation', description: 'Bla', members: List([])});

  it('UNKNOWN_TYPE does not change state', () => {
    const action = {type: 'CALCULATION:UNKNOWN_TYPE'};
    expect(calculations(state, action)).toEqual(state);
  });

  it('LOAD_FAILURE does not change the state', () => {
    const action = {type: 'CALCULATION:LOAD_FAILURE'};
    expect(calculations(state, action)).toEqual(state);
  });

  it('CREATE_FAILURE does not change the state', () => {
    const action = {type: 'CALCULATION:CREATE_FAILURE'};
    expect(calculations(state, action)).toEqual(state);
  });

  it('DELETE_FAILURE does not change the state', () => {
    const action = {type: 'CALCULATION:DELETE_FAILURE'};
    expect(calculations(state, action)).toEqual(state);
  });

  it('UPDATE_FAILURE does not change the state', () => {
    const action = {type: 'CALCULATION:UPDATE_FAILURE'};
    expect(calculations(state, action)).toEqual(state);
  });
});

describe('CALCULATION:LOAD_SUCCESS', () => {
  const action = (calculation) => ({
    ...calculation,
    type: 'CALCULATION:LOAD_SUCCESS',
  });

  it('sets the expenses', () => {
    const calculation = {name: 'Calculation', description: 'bla', members: List([]), matrix: Map({})};

    const beforeState = initialState;
    const afterState = Map(calculation);

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});

describe('CALCULATION:CREATE_SUCCESS', () => {
  const action = (calculation) => ({
    type: 'CALCULATION:CREATE_SUCCESS',
    ...calculation,
  });
  const calculation = {name: 'A calculation', description: '', members: List([])};

  it('creates the calculation', () => {
    const beforeState = Map({});
    const afterState = Map(calculation);

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});

describe('CALCULATION:DELETE_SUCCESS', () => {
  const action = (calculation) => ({
    type: 'CALCULATION:DELETE_SUCCESS',
  });
  const calculation = {name: 'A calculation', description: '', members: List([])};

  it('updates the calculation', () => {
    const beforeState = Map(calculation);
    const afterState = initialState;

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});

describe('CALCULATION:UPDATE_SUCCESS', () => {
  const action = (calculation) => ({
    type: 'CALCULATION:UPDATE_SUCCESS',
    name: 'A new name',
    description: '',
    members: List([]),
  });
  const calculation = {name: 'A calculation', description: '', members: List([])};

  it('updates the calculation', () => {
    const beforeState = Map(calculation);
    const afterState = Map(calculation).merge({name: 'A new name'});

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});
