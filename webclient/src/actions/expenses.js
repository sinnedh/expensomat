export const getExpenses = (token) => {
  return {type: 'EXPENSES:LOAD_REQUEST', token}
}

export const createExpense = (token, expense) => {
  return {type: 'EXPENSES:CREATE_REQUEST', token, expense}
}

export const deleteExpense = (token, id) => {
  return {type: 'EXPENSES:DELETE_REQUEST', token, id}
}

export const updateExpense = (token, id, changes) => {
  return {type: 'EXPENSES:UPDATE_REQUEST', token, id, changes}
}
