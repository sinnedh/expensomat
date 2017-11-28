const initialState = {
  loadingCounter: 0,
  message: null,
  type: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APPLICATION:INCREMENT_LOADING_COUNTER':
      return {...state, loadingCounter: state.loadingCounter + 1};

    case 'APPLICATION:DECREMENT_LOADING_COUNTER':
      return {
        ...state,
        loadingCounter: state.loadingCounter > 0 ? state.loadingCounter - 1 : 0,
      };

    case 'APPLICATION:RESET_LOADING_COUNTER':
      return {...state, loadingCounter: 0};

    case 'APPLICATION:NOTIFICATION_RESET':
      return initialState;

    case 'APPLICATION:NOTIFICATION_SET':
      return {
        ...state,
        message: action.message,
        type: action.notificationType,
      }

    default:
      return state;
  }
}
