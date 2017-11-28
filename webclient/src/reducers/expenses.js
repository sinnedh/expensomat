const initialState = {
  items: [],
}

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case 'EXPENSES:LOAD_SUCCESS':
      return {
        ...state,
        items: action.items
      };

    case 'EXPENSES:CREATE_SUCCESS':
      return {
        ...state,
        items: [action.expense, ...state.items]
      };

    case 'EXPENSES:LOAD_REQUEST':
    case 'EXPENSES:LOAD_FAILURE':
    case 'EXPENSES:CREATE_REQUEST':
    case 'EXPENSES:CREATE_FAILURE':
    default:
      return state;
  }
}

export default expenses;
