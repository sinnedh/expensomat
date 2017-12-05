import 'whatwg-fetch';
import {incrementLoadingCounter, decrementLoadingCounter} from './actions';
import {setErrorNotification, setInfoNotification} from './actions';

const baseurl = 'http://localhost:4000/api';

const requestSuccess = (dispatch, callback, data) => {
  dispatch(callback(data));
  dispatch(decrementLoadingCounter());
  dispatch(setInfoNotification('Request was successful.'));
}

const requestFailure = (dispatch, callback, data) => {
  dispatch(callback(data));
  dispatch(decrementLoadingCounter());
  dispatch(setErrorNotification(`Could not load/send data. Error: ${data}`));
}

const request = (method, url, dispatch, onSuccess, onFailure, body) => {
  let options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) {
    options.body = body;
  }

  dispatch(incrementLoadingCounter());
  fetch(url, options)
    .then(res => res.text())
    .then(text => text.length > 0 ? JSON.parse(text) : {})
    .then(json => requestSuccess(dispatch, onSuccess, json.data))
    .catch(e => requestFailure(dispatch, onFailure, e));
}

const postRequest = (url, dispatch, onSuccess, onFailure, body) => {
  return request('POST', url, dispatch, onSuccess, onFailure, body);
}

const getRequest = (url, dispatch, onSuccess, onFailure) => {
  return request('GET', url, dispatch, onSuccess, onFailure);
}

const deleteRequest = (url, dispatch, onSuccess, onFailure) => {
  return request('DELETE', url, dispatch, onSuccess, onFailure, {});
}

export const addCalculation = (dispatch, calculation, onSuccess, onFailure) => {
  postRequest(
    `${baseurl}/calculations/`,
    dispatch,
    onSuccess,
    onFailure,
    JSON.stringify({ calculation }),
  )
};

export const fetchCalculation = (token) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const url = `${baseurl}/calculations/${token}`

  return fetch(url, options)
    .then(res => res.text())
    .then(text => text.length > 0 ? JSON.parse(text) : {})
}

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
    dispatch,
    onSuccess,
    onFailure,
    JSON.stringify({ expense }),
  )
}

export const deleteExpense = (dispatch, token, expense, onSuccess, onFailure) => {
  deleteRequest(
    `${baseurl}/calculations/${token}/expenses/${expense.id}`,
    dispatch,
    onSuccess,
    onFailure,
  )
}
