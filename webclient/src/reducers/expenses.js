import { List, Map } from 'immutable'

const initialState = Map()

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case 'EXPENSES:LOAD_SUCCESS':
      return List(action.items).reduce(
        (result, value) => result.set(value['id'].toString(), Map(value)),
        Map()
      );

    case 'EXPENSES:CREATE_SUCCESS':
      return state.merge({[action.expense.id]: Map({...action.expense})})

    case 'EXPENSES:DELETE_SUCCESS':
      return state.delete(action.id.toString())

    case 'EXPENSES:UPDATE_SUCCESS':
      return state.merge({[action.id]: action.expense})

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
