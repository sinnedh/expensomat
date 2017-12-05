export const getCalculation = (token) => {
  return {type: 'CALCULATION:LOAD_REQUEST', token}
}

export const createCalculation = (token, calculation) => {
  return {type: 'CALCULATION:CREATE_REQUEST', calculation}
}

export const deleteCalculation = (token, calculation) => {
  return {type: 'CALCULATION:DELETE_REQUEST', token, calculation}
}
