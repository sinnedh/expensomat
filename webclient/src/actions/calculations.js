import {addCalculation, fetchCalculation} from '../api';

export const getCalculation = (token) => {
  return {type: 'CALCULATION:LOAD_REQUEST', token}
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
