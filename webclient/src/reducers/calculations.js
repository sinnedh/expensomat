const initialState = {
  name: '',
  description: '',
  members: [],
  matrix: {},
  expenses: [],
  isFetching: false,
}

const calculations = (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATION:LOAD_REQUEST':
      return {...state, isFetching: true};

    case 'CALCULATION:LOAD_SUCCESS':
      return {
        ...state,
        name: action.name,
        description: action.description,
        members: action.members,
        matrix: action.matrix,
        isFetching: false
      };

    case 'CALCULATION:LOAD_FAILURE':
      return {...state, isFetching: false};

    case 'CALCULATION:CREATE_REQUEST':
      return {...state, isFetching: true};

    case 'CALCULATION:CREATE_SUCCESS':
      return {
        ...state,
        name: action.name,
        description: action.description,
        members: action.members,
        isFetching: false
      };

    case 'CALCULATION:CREATE_FAILURE':
      return {...state, isFetching: false};

    default:
      return state;
  }
}

export default calculations;
