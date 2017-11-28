import { combineReducers } from 'redux';
import application from './application';
import calculations from './calculations';
import expenses from './expenses';
import notifications from './notifications';

export default combineReducers({
  application,
  calculations,
  expenses,
  notifications,
});
