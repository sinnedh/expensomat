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
  return {type: 'CALCULATION:LOAD_EXPENSES_REQUEST'}
}

export const receiveExpensesSuccess = (expenses) => {
  return {type: 'CALCULATION:LOAD_EXPENSES_SUCCESS', expenses}
}

export const receiveExpensesFailure = (error) => {
  return {type: 'CALCULATION:LOAD_EXPENSES_FAILURE', message: error.message}
}
