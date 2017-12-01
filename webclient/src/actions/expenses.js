import {
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
  fetchExpenses as apiFetchExpenses
} from '../api';

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
    return apiFetchExpenses(
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
    return apiAddExpense(
      dispatch,
      token,
      expense,
      createExpenseSuccess,
      createExpenseFailure,
    )
  }
}


export const deleteExpense = (token, expense) => {
  const deleteExpenseRequest = (expense) => {
    return {type: 'EXPENSES:DELETE_REQUEST', expense}
  }

  const deleteExpenseSuccess = () => {
    return {type: 'EXPENSES:DELETE_SUCCESS', id: expense.id}
  }

  const deleteExpenseFailure = (error) => {
    return {type: 'EXPENSES:DELETE_FAILURE', message: error.message}
  }

  return dispatch => {
    dispatch(deleteExpenseRequest(expense));
    return apiDeleteExpense(
      dispatch,
      token,
      expense,
      deleteExpenseSuccess,
      deleteExpenseFailure,
    )
  }
}
