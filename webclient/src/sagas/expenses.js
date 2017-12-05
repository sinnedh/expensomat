import { call, put } from 'redux-saga/effects'
import { setErrorNotification, setInfoNotification } from '../actions'
import { incrementLoadingCounter, decrementLoadingCounter } from '../actions'
import * as api from '../api'

export function* createExpense(action) {
  yield put(incrementLoadingCounter())
  try {
    yield call(api.createExpense, action.token, action.expense)
    yield put({
      type: "EXPENSES:CREATE_SUCCESS",
      expense: action.expense,
    })
    yield put(setInfoNotification('Expense created succesfully'))
  } catch (e) {
    yield put({type: "EXPENSES:CREATE_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not create expense ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* deleteExpense(action) {
  yield put(incrementLoadingCounter())
  try {
    yield call(api.deleteExpense, action.token, action.expense.id)
    yield put({
      type: "EXPENSES:DELETE_SUCCESS",
      id: action.expense.id,
    })
    yield put(setInfoNotification('Expense deleted succesfully'))
  } catch (e) {
    yield put({type: "EXPENSES:DELETED_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not delete expense ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* fetchExpenses(action) {
  yield put(incrementLoadingCounter())

  try {
    const expenses = yield call(api.fetchExpenses, action.token)
    yield put({
      type: "EXPENSES:LOAD_SUCCESS",
      items: expenses.data,
    })
  } catch (e) {
    yield put({type: "EXPENSES:LOAD_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not load expenses ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}
