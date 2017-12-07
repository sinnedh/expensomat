export * from './loadingCounter'
export * from './notifications'

export const setToken = (token) => {
  return {
    type: 'APPLICATION:SET_TOKEN',
    token,
  }
}
