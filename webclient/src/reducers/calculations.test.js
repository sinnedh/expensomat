import calculations from './calculations';

const initialState = {name: '', description: '', matrix: [], members: []};

describe('CALCULATION:LOAD_FAILURE', () => {
  const action = {type: 'CALCULATION:LOAD_FAILURE'};

  it('does not change the calculation', () => {
    const calculation = {name: 'Calculation', description: 'bla', matrix: [], members: []};

    const beforeState = {...calculation};
    const afterState = {...calculation};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:LOAD_SUCCESS', () => {
  const action = (calculation) => ({
    ...calculation,
    type: 'CALCULATION:LOAD_SUCCESS',
  });

  it('sets the expenses', () => {
    const calculation = {name: 'Calculation', description: 'bla', matrix: [], members: []};

    const beforeState = {...initialState};
    const afterState = {...calculation};

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});

describe('CALCULATION:CREATE_FAILURE', () => {
  const action = {type: 'CALCULATION:CREATE_FAILURE'};
  const calculation = {name: 'A calculation', description: '', members: []};

  it('does not change the calculation', () => {
    const beforeState = {...calculation};
    const afterState = {...calculation};

    expect(calculations(beforeState, action)).toEqual(afterState);
  });
});

describe('CALCULATION:CREATE_SUCCESS', () => {
  const action = (calculation) => ({
    type: 'CALCULATION:CREATE_SUCCESS',
    ...calculation,
  });
  const calculation = {name: 'A calculation', description: '', members: []};

  it('updates the calculation', () => {
    const beforeState = {};
    const afterState = {...calculation};

    expect(calculations(beforeState, action(calculation))).toEqual(afterState);
  });
});
