import 'whatwg-fetch';

const baseurl = 'http://localhost:4000/api';


var createCalculation = (calculation, onSuccess, onFailure) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ calculation }),
  }

  fetch(`${baseurl}/calculations/`, options)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
};

var getCalculation = (token, onSuccess, onFailure) => {
  fetch(`${baseurl}/calculations/${token}`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
};

var getExpensesForCalculation = (token, onSuccess, onFailure) => {
  fetch(`${baseurl}/calculations/${token}/expenses`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
};

var createExpense = (token, expense, onSuccess, onFailure) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expense }),
  }

  fetch(`${baseurl}/calculations/${token}/expenses`, options)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
}

export {
  createCalculation,
  createExpense,
  getCalculation,
  getExpensesForCalculation
};
