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
