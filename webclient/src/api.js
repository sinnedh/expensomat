import 'whatwg-fetch';
import {incrementLoadingCounter, decrementLoadingCounter} from './actions';

const baseurl = 'http://localhost:4000/api';

const requestSuccess = (dispatch, callback, data) => {
  dispatch(callback(data));
  dispatch(decrementLoadingCounter());
}

const requestFailure = (dispatch, callback, data) => {
  dispatch(callback(data));
  dispatch(decrementLoadingCounter());
}

const getRequest = (url, dispatch, onSuccess, onFailure) => {
  dispatch(incrementLoadingCounter());
  fetch(url)
    .then(r => r.json())
    .then(r => requestSuccess(dispatch, onSuccess, r.data))
    .catch(e => requestFailure(dispatch, onFailure, e));
}

const postRequest = (url, body, dispatch, onSuccess, onFailure) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }
  dispatch(incrementLoadingCounter());
  fetch(url, options)
    .then(r => r.json())
    .then(r => requestSuccess(dispatch, onSuccess, r.data))
    .catch(e => requestFailure(dispatch, onFailure, e));
}

export const addCalculation = (dispatch, calculation, onSuccess, onFailure) => {
  postRequest(
    `${baseurl}/calculations/`,
    JSON.stringify({ calculation }),
    dispatch,
    onSuccess,
    onFailure,
  )
};

export const fetchCalculation = (dispatch, token, onSuccess, onFailure) => {
  getRequest(
    `${baseurl}/calculations/${token}`,
    dispatch,
    onSuccess,
    onFailure,
  )
};

export const fetchExpenses = (dispatch, token, onSuccess, onFailure) => {
  getRequest(
    `${baseurl}/calculations/${token}/expenses`,
    dispatch,
    onSuccess,
    onFailure,
  )
};

export const addExpense = (dispatch, token, expense, onSuccess, onFailure) => {
  postRequest(
    `${baseurl}/calculations/${token}/expenses`,
    JSON.stringify({ expense }),
    dispatch,
    onSuccess,
    onFailure,
  )
}
