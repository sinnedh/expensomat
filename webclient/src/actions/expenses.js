import {addExpense, fetchExpenses} from '../api';

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

export const createExpense = (token, expense) => {
  const createExpenseRequest = (expense) => {
    return {type: 'EXPENSES:CREATE_REQUEST', expense}
  }

  const createExpenseSuccess = (expense) => {
    return {type: 'EXPENSES:CREATE_SUCCESS', expense}
  }

  const createExpenseFailure = (error) => {
    return {type: 'EXPENSES:CREATE_FAILURE', message: error.message}
  }

  return dispatch => {
    dispatch(createExpenseRequest(expense));
    return addExpense(
      dispatch,
      token,
      expense,
      createExpenseSuccess,
      createExpenseFailure,
    )
  }
}
