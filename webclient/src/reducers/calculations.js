const initialState = {
  name: '',
  description: '',
  members: [],
  matrix: {},
  expenses: [],
}

const calculations = (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATION:LOAD_SUCCESS':
      return {
        ...state,
        name: action.name,
        description: action.description,
        members: action.members,
        matrix: action.matrix,
      };

    case 'CALCULATION:CREATE_SUCCESS':
      return {
        ...state,
        name: action.name,
        description: action.description,
        members: action.members,
      };

    case 'CALCULATION:LOAD_REQUEST':
    case 'CALCULATION:LOAD_FAILURE':
    case 'CALCULATION:CREATE_REQUEST':
    case 'CALCULATION:CREATE_FAILURE':
    default:
      return state;
  }
}

export default calculations;
