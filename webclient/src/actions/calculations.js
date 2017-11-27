import {fetchCalculation} from '../api';

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
