import { call, put } from 'redux-saga/effects'
import { setErrorNotification, setInfoNotification } from '../actions'
import { incrementLoadingCounter, decrementLoadingCounter } from '../actions'
import * as api from '../api'

export function* createCalculation(action) {
  yield put(incrementLoadingCounter())
  try {
    const calculation = yield call(api.createCalculation, action.token, action.calculation)
    yield put({
      type: "CALCULATION:CREATE_SUCCESS",
      name: calculation.data.name,
      members: calculation.data.members,
      description: calculation.data.description,
    })
    yield put(setInfoNotification('Calculation created succesfully'))
  } catch (e) {
    yield put({type: "CALCULATION:CREATE_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not create calculation ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* fetchCalculation(action) {
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
