import { combineReducers } from 'redux-immutable';
import application from './application';
import calculations from './calculations';
import expenses from './expenses';

export default combineReducers({
  application,
  calculations,
  expenses,
});
