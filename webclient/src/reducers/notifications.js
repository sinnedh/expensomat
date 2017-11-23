const initialState = {
  message: '',
  type: null, // can be 'error', 'warning', 'info', 'success'
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_RESET':
      return initialState;

    case 'NOTIFICATION_SET_ERROR':
      return {
        message: action.message,
        type: 'error',
      }

    case 'NOTIFICATION_SET_WARNING':
      return {
        message: action.message,
        type: 'warning',
      }

    case 'NOTIFICATION_SET_INFO':
      return {
        message: action.message,
        type: 'info',
      }

    case 'NOTIFICATION_SET_SUCCESS':
      return {
        message: action.message,
        type: 'success',
      }

    default:
      return state;
  }
}

export default notifications;
