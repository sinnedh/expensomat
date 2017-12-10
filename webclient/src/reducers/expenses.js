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

    case 'EXPENSES:DELETE_SUCCESS':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };

    case 'EXPENSES:UPDATE_SUCCESS':
      const items = state.items.map( (item, index) => {
            if(item.id !== action.id) {
                return item;
            }
            return {...item, ...action.changes}
        })
      return {
        ...state,
        items
      };

    case 'EXPENSES:LOAD_REQUEST':
    case 'EXPENSES:LOAD_FAILURE':
    case 'EXPENSES:CREATE_REQUEST':
    case 'EXPENSES:CREATE_FAILURE':
    case 'EXPENSES:DELETE_REQUEST':
    case 'EXPENSES:DELETE_FAILURE':
    case 'EXPENSES:UPDATE_REQUEST':
    case 'EXPENSES:UPDATE_FAILURE':
    default:
      return state;
  }
}

export default expenses;
