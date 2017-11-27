import {fetchExpenses} from '../api';

export const getExpenses = (token) => {
  const requestExpenses = () => {
    return {type: 'EXPENSES:LOAD_REQUEST'}
  }

  const receiveExpensesSuccess = (items) => {
    return {type: 'EXPENSES:LOAD_SUCCESS', items}
  }

  const receiveExpensesFailure = (error) => {
    return {type: 'EXPENSES:LOAD_FAILURE', message: error.message}
  }

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



}
