import { call, put } from 'redux-saga/effects'
import { setErrorNotification, setInfoNotification } from '../actions'
import { incrementLoadingCounter, decrementLoadingCounter } from '../actions'
import * as api from '../api'

export function* createMember(action) {
  yield put(incrementLoadingCounter())
  try {
    const member = yield call(api.createMember, action.token, action.member)
    yield put({
      type: "MEMBERS:CREATE_SUCCESS",
      member: member.data,
    })
    yield put(setInfoNotification('Member created succesfully'))
  } catch (e) {
    yield put({type: "MEMBERS:CREATE_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not create member ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* updateMember(action) {
  yield put(incrementLoadingCounter())
  try {
    const member = yield call(api.updateMember, action.token, action.id, action.changes)
    yield put({
      type: "MEMBERS:UPDATE_SUCCESS",
      id: member.data.id,
      name: member.data.name,
    })
    yield put(setInfoNotification('Member updated succesfully'))
  } catch (e) {
    yield put({type: "MEMBERS:UPDATE_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not update member ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* deleteMember(action) {
  yield put(incrementLoadingCounter())
  try {
    yield call(api.deleteMember, action.token, action.memberId)
    yield put({
      type: "MEMBERS:DELETE_SUCCESS",
      id: action.memberId,
    })
    yield put(setInfoNotification('Member deleted succesfully'))
  } catch (e) {
    yield put({type: "MEMBERS:DELETED_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not delete member ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}

export function* fetchMembers(action) {
  yield put(incrementLoadingCounter())

  try {
    const members = yield call(api.fetchMembers, action.token)
    yield put({
      type: "MEMBERS:LOAD_SUCCESS",
      items: members.data,
    })
  } catch (e) {
    yield put({type: "MEMBERS:LOAD_FAILURE", message: e.message})
    yield put(setErrorNotification(`Could not load members ("${e.message}")`))
  } finally {
    yield put(decrementLoadingCounter())
  }
}
