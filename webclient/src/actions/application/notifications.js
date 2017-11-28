export const resetNotification = () => {
  return {
    type: 'APPLICATION:NOTIFICATION_RESET',
  }
}

export const setErrorNotification = (notificationText) => {
  return {
    type: 'APPLICATION:NOTIFICATION_SET',
    notificationText,
    notificationType: 'error',
  }
}

export const setWarningNotification = (notificationText) => {
  return {
    type: 'APPLICATION:NOTIFICATION_SET',
    notificationText,
    notificationType: 'warning',
  }
}

export const setInfoNotification = (notificationText) => {
  return {
    type: 'APPLICATION:NOTIFICATION_SET',
    notificationText,
    notificationType: 'info',
  }
}

export const setSuccessNotification = (notificationText) => {
  return {
    type: 'APPLICATION:NOTIFICATION_SET',
    notificationText,
    notificationType: 'success',
  }
}
