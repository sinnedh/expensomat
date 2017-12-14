import * as actions from './notifications'

describe('APPLICATION', () => {
  it('handles resetNotification', () => {
    const action = actions.resetNotification()
    expect(action).toMatchSnapshot()
  })

  it('handles setErrorNotification', () => {
    const action = actions.setErrorNotification('This is an error.')
    expect(action).toMatchSnapshot()
  })

  it('handles setWarningNotification', () => {
    const action = actions.setWarningNotification('This is a warning.')
    expect(action).toMatchSnapshot()
  })

  it('handles setInfoNotification', () => {
    const action = actions.setInfoNotification('This is an info.')
    expect(action).toMatchSnapshot()
  })

  it('handles setSuccessNotification', () => {
    const action = actions.setSuccessNotification('This is a success.')
    expect(action).toMatchSnapshot()
  })
})
