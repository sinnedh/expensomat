export const setToken = (token) => {
  return {
    type: 'APPLICATION:SET_TOKEN',
    token,
  }
}

export const setUser = (user) => {
  return {
    type: 'APPLICATION:SET_USER',
    user,
  }
}

export const resetUser = () => {
  return {
    type: 'APPLICATION:RESET_USER',
  }
}
