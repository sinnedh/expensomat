import { takeLatest } from 'redux-saga/effects'
import { createCalculation, deleteCalculation, fetchCalculation, updateCalculation } from './calculations'
import { createExpense, deleteExpense, fetchExpenses, updateExpense } from './expenses'

function* appSaga() {
  yield takeLatest("CALCULATION:CREATE_REQUEST", createCalculation)
  yield takeLatest("CALCULATION:DELETE_REQUEST", deleteCalculation)
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)
  yield takeLatest("CALCULATION:UPDATE_REQUEST", updateCalculation)

  yield takeLatest("EXPENSES:CREATE_REQUEST", createExpense)
  yield takeLatest("EXPENSES:DELETE_REQUEST", deleteExpense)
  yield takeLatest("EXPENSES:LOAD_REQUEST", fetchExpenses)
  yield takeLatest("EXPENSES:UPDATE_REQUEST", updateExpense)
}

export default appSaga;
