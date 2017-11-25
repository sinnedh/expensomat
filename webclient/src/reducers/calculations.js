const initialState = {
  expenses: [],
  isFetching: false,
}

const calculations = (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATION:LOAD_EXPENSES_REQUEST':
      return {...state, isFetching: true};

    case 'CALCULATION:LOAD_EXPENSES_SUCCESS':
      return {...state, expenses: action.expenses, isFetching: false};

    case 'CALCULATION:LOAD_EXPENSES_FAILURE':
      return {...state, isFetching: false};

    default:
      return state;
  }
}

export default calculations;
