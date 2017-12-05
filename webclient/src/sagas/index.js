import { takeLatest } from 'redux-saga/effects'
import { fetchCalculation } from './calculations'

function* appSaga() {
  yield takeLatest("CALCULATION:CREATE_REQUEST", createCalculation)
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)
}

export default appSaga;
