import { combineReducers } from 'redux';
import calculations from './calculations';
import expenses from './expenses';
import notifications from './notifications';

export default combineReducers({
  calculations,
  expenses,
  notifications,
});
