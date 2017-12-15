import { Map } from 'immutable'

const initialState = Map({
  loadingCounter: 0,
  notificationText: null,
  notificationType: null,
  token: null,
})

export default (state = initialState, action) => {
  switch (action.type) {

    case 'APPLICATION:SET_TOKEN':
      return state.update('token', token => action.token)

    case 'APPLICATION:INCREMENT_LOADING_COUNTER':
      return state.update('loadingCounter', l => l + 1)

    case 'APPLICATION:DECREMENT_LOADING_COUNTER':
      return state.update('loadingCounter', l => l > 0 ? l - 1 : 0)

    case 'APPLICATION:RESET_LOADING_COUNTER':
      return state.update('loadingCounter', _ => 0)

    case 'APPLICATION:NOTIFICATION_RESET':
      return initialState;

    case 'APPLICATION:NOTIFICATION_SET':
      return state.merge({
        notificationText: action.notificationText,
        notificationType: action.notificationType,
      })

    default:
      return state;
  }
}
