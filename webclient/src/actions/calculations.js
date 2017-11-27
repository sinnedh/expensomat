import {fetchCalculation} from '../api';

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
