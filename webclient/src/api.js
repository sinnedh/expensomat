import 'whatwg-fetch';

const baseurl = 'http://localhost:4000/api';

var getCalculation = (calculation_id, onSuccess) => {
  fetch(`${baseurl}/calculations/${calculation_id}`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(err => console.error(err));
};

var getExpensesForCalculation = (calculation_id, onSuccess) => {
  fetch(`${baseurl}/calculations/${calculation_id}/expenses`)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(err => console.error(err));
};

var createExpense = (calculationId, expense, onSuccess) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expense }),
  }

  fetch(`${baseurl}/calculations/${calculationId}/expenses`, options)
    .then(r => r.json())
    .then(r => onSuccess(r.data))
    .catch(err => console.error(err));
}

export { createExpense, getCalculation, getExpensesForCalculation };
