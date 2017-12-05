import { call, put, takeLatest } from 'redux-saga/effects'
import { setErrorNotification, setInfoNotification } from './actions'
import { incrementLoadingCounter, decrementLoadingCounter } from './actions';
import * as api from './api'

function* fetchCalculation(action) {
  yield put(incrementLoadingCounter())

  try {
    const calculation = yield call(api.fetchCalculation, action.token)

    yield put({
      type: "CALCULATION:LOAD_SUCCESS",
      name: calculation.data.name,
      members: calculation.data.members,
      description: calculation.data.description,
      matrix: calculation.data.matrix,
    })
    yield put(setInfoNotification('Calculation loaded succesfully'))
  } catch (e) {
    yield put({type: "CALCULATION:LOAD_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not load calculation ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

function* appSaga() {
  yield takeLatest("CALCULATION:LOAD_REQUEST", fetchCalculation)
}

export default appSaga;
