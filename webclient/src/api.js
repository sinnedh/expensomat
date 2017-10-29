import 'whatwg-fetch';

const baseurl = 'http://localhost:4000/api';

var getCalculation = (calculationId, onSuccess, onFailure) => {
  fetch(`${baseurl}/calculations/${calculationId}`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
};

var getExpensesForCalculation = (calculationId, onSuccess, onFailure) => {
  fetch(`${baseurl}/calculations/${calculationId}/expenses`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
};

var createExpense = (calculationId, expense, onSuccess, onFailure) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expense }),
  }

  fetch(`${baseurl}/calculations/${calculationId}/expenses`, options)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(e => onFailure(e));
}

export { createExpense, getCalculation, getExpensesForCalculation };
