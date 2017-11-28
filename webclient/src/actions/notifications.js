export const resetNotification = () => {
  return {
    type: 'NOTIFICATION_RESET',
  }
}

export const setErrorNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET',
    message,
    notificationType: 'error',
  }
}

export const setWarningNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET',
    message,
    notificationType: 'warning',
  }
}

export const setInfoNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET',
    message,
    notificationType: 'info',
  }
}

export const setSuccessNotification = (message) => {
  return {
    type: 'NOTIFICATION_SET',
    message,
    notificationType: 'success',
  }
}
