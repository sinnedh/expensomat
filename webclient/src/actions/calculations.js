import {addCalculation, fetchCalculation} from '../api';

export const getCalculation = (token) => {
  const requestCalculation = () => {
    return {type: 'CALCULATION:LOAD_REQUEST'}
  }

  const receiveCalculationSuccess = (data) => {
    return {
      type: 'CALCULATION:LOAD_SUCCESS',
      name: data.name,
      description: data.description,
      members: data.members,
      matrix: data.matrix,
    }
  }

  const receiveCalculationFailure = (error) => {
    return {type: 'CALCULATION:LOAD_FAILURE', message: error.message}
  }

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

export const createCalculation = (token, calculation) => {
  const createCalculationRequest = (data) => {
    return {type: 'CALCULATION:CREATE_REQUEST', calculation}
  }

  const createCalculationSuccess = (calculation) => {
    return {type: 'CALCULATION:CREATE_SUCCESS', calculation}
  }

  const createCalculationFailure = (error) => {
    return {type: 'CALCULATION:CREATE_FAILURE', message: error.message}
  }

  return dispatch => {
    dispatch(createCalculationRequest(calculation));
    return addCalculation(
      dispatch,
      createCalculationSuccess,
      createCalculationFailure,
    )
  }
}
