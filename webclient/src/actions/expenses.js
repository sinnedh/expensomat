export const getExpenses = (token) => {
  return {type: 'EXPENSES:LOAD_REQUEST', token}
}

export const createExpense = (token, expense) => {
  return {type: 'EXPENSES:CREATE_REQUEST', token, expense}
}

export const deleteExpense = (token, expense) => {
  return {type: 'EXPENSES:DELETE_REQUEST', token, expense}
}
