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
    .then(r => r.json())
    .then(r => requestSuccess(dispatch, onSuccess, r.data))
    .catch(e => requestFailure(dispatch, onFailure, e));
}

const postRequest = (url, dispatch, onSuccess, onFailure, body) => {
  return request('POST', url, dispatch, onSuccess, onFailure, body);
}

const getRequest = (url, dispatch, onSuccess, onFailure) => {
  return request('GET', url, dispatch, onSuccess, onFailure);
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
