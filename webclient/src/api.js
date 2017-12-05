import 'whatwg-fetch';

const baseurl = 'http://localhost:4000/api';

const applyRequest = (method, url, body) => {
  let options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (body !== undefined) {
    options.body = body;
  }

  return fetch(url, options)
    .then(res => res.text())
    .then(text => text.length > 0 ? JSON.parse(text) : {})
}

const postRequest = (url, body) => ( applyRequest('POST', url, body) )

const getRequest = (url) => ( applyRequest('GET', url) )

const deleteRequest = (url) => ( applyRequest('DELETE', url) )

export const createCalculation = (calculation) => (
  postRequest(`${baseurl}/calculations/`, JSON.stringify({ calculation }))
)

export const fetchCalculation = (token) => (
  getRequest(`${baseurl}/calculations/${token}`)
)

export const deleteCalculation = (token) => (
  deleteRequest(`${baseurl}/calculations/${token}`)
)

export const fetchExpenses = (token) => (
  getRequest(`${baseurl}/calculations/${token}/expenses`)
)

export const createExpense = (token, expense) => (
  postRequest(`${baseurl}/calculations/${token}/expenses`, JSON.stringify({ expense }))
)

export const deleteExpense = (token, expenseId) => (
  deleteRequest(`${baseurl}/calculations/${token}/expenses/${expenseId}`)
)
