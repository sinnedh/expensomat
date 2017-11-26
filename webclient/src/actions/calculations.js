import {fetchExpenses, fetchCalculation} from '../api';

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


export const getCalculation = (token) => {
  return dispatch => {
    dispatch(requestCalculation());
    return fetchCalculation(
      dispatch,
      token,
      receiveCalculationSuccess,
      receiveCalculationFailure,
    )
  }
}

export const requestCalculation = () => {
  return {type: 'CALCULATION:LOAD_REQUEST'}
}

export const receiveCalculationSuccess = (data) => {
  return {
    type: 'CALCULATION:LOAD_SUCCESS',
    name: data.name,
    description: data.description,
    members: data.members,
    matrix: data.matrix,
  }
}

export const receiveCalculationFailure = (error) => {
  return {type: 'CALCULATION:LOAD_FAILURE', message: error.message}
}
