import { takeLatest } from 'redux-saga/effects'
import { createCalculation, deleteCalculation, fetchCalculation } from './calculations'
import { createExpense, deleteExpense, fetchExpenses } from './expenses'

function* appSaga() {
  yield takeLatest("CALCULATION:CREATE_REQUEST", createCalculation)
  yield takeLatest("CALCULATION:DELETE_REQUEST", deleteCalculation)
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)

  yield takeLatest("EXPENSES:CREATE_REQUEST", createExpense)
  yield takeLatest("EXPENSES:DELETE_REQUEST", deleteExpense)
  yield takeLatest("EXPENSES:LOAD_REQUEST", fetchExpenses)
}

export default appSaga;
