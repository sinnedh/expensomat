export const getCalculation = (token) => {
  return {type: 'CALCULATION:LOAD_REQUEST', token}
}

export const createCalculation = (calculation) => {
  return {type: 'CALCULATION:CREATE_REQUEST', calculation}
}

export const deleteCalculation = (token, calculation) => {
  return {type: 'CALCULATION:DELETE_REQUEST', token, calculation}
}

export const updateCalculation = (token, changes) => {
  return {type: 'CALCULATION:UPDATE_REQUEST', token, changes}
}
