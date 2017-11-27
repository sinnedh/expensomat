import calculations from './calculations';

const initialState = {name: '', description: '', matrix: [], members: []};

describe('CALCULATION:LOAD_REQUEST', () => {
  const action = {type: 'CALCULATION:LOAD_REQUEST'};

  it('sets isFetching', () => {
    const beforeState = {...initialState, isFetching: false};
    const afterState = {...initialState, isFetching: true};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:LOAD_FAILURE', () => {
  const action = {type: 'CALCULATION:LOAD_FAILURE'};

  it('resets isFetching', () => {
    const beforeState = {...initialState, isFetching: true};
    const afterState = {...initialState, isFetching: false};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });

  it('does not change the calculation', () => {
    const calculation = {name: 'Calculation', description: 'bla', matrix: [], members: []};

    const beforeState = {...calculation, isFetching: true};
    const afterState = {...calculation, isFetching: false};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:LOAD_SUCCESS', () => {
  const action = (calculation) => ({
    ...calculation,
    type: 'CALCULATION:LOAD_SUCCESS',
  });

  it('resets isFetching', () => {
    const beforeState = {...initialState, isFetching: true};
    const afterState = {...initialState, isFetching: false};

    expect(calculations(beforeState, action(initialState))).toEqual(afterState);
  });

  it('sets the expenses', () => {
    const calculation = {name: 'Calculation', description: 'bla', matrix: [], members: []};

    const beforeState = {...initialState, isFetching: true};
    const afterState = {...calculation,  isFetching: false};

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});


describe('CALCULATION:CREATE_REQUEST', () => {
  const action = {type: 'CALCULATION:CREATE_REQUEST'};
  const calculation = {name: 'A calculation', description: '', members: []};

  it('sets isFetching', () => {
    const calculation = {name: 'A new calculation', description: '', members: []};
    const beforeState = {...calculation, isFetching: false};
    expect(calculations(beforeState, action).isFetching).toEqual(true);
  });
});

describe('CALCULATION:CREATE_FAILURE', () => {
  const action = {type: 'CALCULATION:CREATE_FAILURE'};
  const calculation = {name: 'A calculation', description: '', members: []};

  it('resets isFetching', () => {
    const beforeState = {...calculation, isFetching: true};
    expect(calculations(beforeState, action).isFetching).toEqual(false);
  });

  it('does not change the calculation', () => {
    const beforeState = {...calculation, isFetching: true};
    const afterState = {...calculation, isFetching: false};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:CREATE_SUCCESS', () => {
  const action = (calculation) => ({
    type: 'CALCULATION:CREATE_SUCCESS',
    ...calculation,
  });
  const calculation = {name: 'A calculation', description: '', members: []};

  it('resets isFetching', () => {
    const beforeState = {name: 'A calculation', isFetching: true};
    expect(calculations(beforeState, action({})).isFetching).toEqual(false);
  });

  it('updates the calculation', () => {
    const beforeState = {isFetching: true};
    const afterState = {...calculation, isFetching: false};

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});
