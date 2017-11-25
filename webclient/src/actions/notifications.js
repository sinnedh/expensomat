export const resetNotification = () => {
  return {
    type: 'NOTIFICATION_RESET',
  }
}

export const setErrorNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET_ERROR',
    message
  }
}

export const setWarningNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET_WARNING',
    message
  }
}

export const setInfoNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET_INFO',
    message
  }
}

export const setSuccessNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET_SUCCESS',
    message
  }
}
