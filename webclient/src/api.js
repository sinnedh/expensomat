import 'whatwg-fetch';

const baseurl = 'http://localhost:4000/api';


const getRequest = (url, dispatch, onSuccess, onFailure) => {
  fetch(url)
    .then(r => r.json())
    .then(r => dispatch(onSuccess(r.data)))
    .catch(e => dispatch(onFailure(e)));
}

const postRequest = (url, body, dispatch, onSuccess, onFailure) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }

  fetch(url, options)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
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
