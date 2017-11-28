const initialState = {
  message: '',
  type: null, // can be 'error', 'warning', 'info', 'success'
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATION:LOAD_FAILURE':
    case 'EXPENSES:LOAD_FAILURE':
      return {
        message: `Could not load data: "${action.message}"`,
        type: 'error',
      }
    case 'EXPENSES:CREATE_FAILURE':
      return {
        message: `Could not create expense: ("${action.message}")`,
        type: 'error',
      }

    case 'CALCULATION:CREATE_FAILURE':
      return {
        message: `Could not create calculation: ("${action.message}")`,
        type: 'error',
      }

    case 'EXPENSES:CREATE_SUCCESS':
      return {
        message: 'Expense was created.',
        type: 'info',
      }

    case 'CALCULATION:CREATE_SUCCESS':
      return {
        message: 'Calculation was created.',
        type: 'info',
      }


    case 'NOTIFICATION_RESET':
      return initialState;

    case 'NOTIFICATION_SET':
      return {
        message: action.message,
        type: action.notificationType,
      }

    default:
      return state;
  }
}

export default notifications;
