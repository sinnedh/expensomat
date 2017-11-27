const initialState = {
  items: [],
  isFetching: false,
}

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case 'EXPENSES:LOAD_REQUEST':
      return {...state, isFetching: true};

    case 'EXPENSES:LOAD_SUCCESS':
      return {...state, items: action.items, isFetching: false};

    case 'EXPENSES:LOAD_FAILURE':
      return {...state, isFetching: false};

    default:
      return state;
  }
}

export default expenses;
