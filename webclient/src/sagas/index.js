import { takeLatest } from 'redux-saga/effects'
import { createCalculation, deleteCalculation, fetchCalculation } from './calculations'

function* appSaga() {
  yield takeLatest("CALCULATION:CREATE_REQUEST", createCalculation)
  yield takeLatest("CALCULATION:DELETE_REQUEST", deleteCalculation)
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)
}

export default appSaga;
