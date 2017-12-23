import { takeLatest } from 'redux-saga/effects'
import { createCalculation, deleteCalculation, fetchCalculation, updateCalculation } from './calculations'
import { createExpense, deleteExpense, fetchExpenses, updateExpense } from './expenses'
import { createMember, deleteMember, fetchMembers, updateMember } from './members'

function* appSaga() {
  yield takeLatest("CALCULATION:CREATE_REQUEST", createCalculation)
  yield takeLatest("CALCULATION:DELETE_REQUEST", deleteCalculation)
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)
  yield takeLatest("CALCULATION:UPDATE_REQUEST", updateCalculation)

  yield takeLatest("EXPENSES:CREATE_REQUEST", createExpense)
  yield takeLatest("EXPENSES:DELETE_REQUEST", deleteExpense)
  yield takeLatest("EXPENSES:LOAD_REQUEST", fetchExpenses)
  yield takeLatest("EXPENSES:UPDATE_REQUEST", updateExpense)

  yield takeLatest("MEMBERS:CREATE_REQUEST", createMember)
  yield takeLatest("MEMBERS:DELETE_REQUEST", deleteMember)
  yield takeLatest("MEMBERS:LOAD_REQUEST", fetchMembers)
  yield takeLatest("MEMBERS:UPDATE_REQUEST", updateMember)
}

export default appSaga;
