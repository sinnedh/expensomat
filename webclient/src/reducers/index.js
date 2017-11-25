import { combineReducers } from 'redux';
import notifications from './notifications';
import calculations from './calculations';

export default combineReducers({
  calculations,
  notifications,
});
