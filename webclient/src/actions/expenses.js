import {fetchExpenses} from '../api';

export const getExpenses = (token) => {
  return dispatch => {
    dispatch(requestExpenses());
    return fetchExpenses(
      dispatch,
      token,
      receiveExpensesSuccess,
      receiveExpensesFailure,
    )
  }
}

export const requestExpenses = () => {
  return {type: 'EXPENSES:LOAD_REQUEST'}
}

export const receiveExpensesSuccess = (items) => {
  return {type: 'EXPENSES:LOAD_SUCCESS', items}
}

export const receiveExpensesFailure = (error) => {
  return {type: 'EXPENSES:LOAD_FAILURE', message: error.message}
}
