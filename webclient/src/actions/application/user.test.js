import * as actions from './user'

describe('APPLICATION', () => {
  const token = 'ABCD123'
  const user = {name: 'Keek', role: 'admin'}

  it('handles setToken', () => {
    const action = actions.setToken(token)
    expect(action).toMatchSnapshot()
  })

  it('handles setUser', () => {
    const action = actions.setUser(user)
    expect(action).toMatchSnapshot()
  })

  it('handles resetUser', () => {
    const action = actions.resetUser()
    expect(action).toMatchSnapshot()
  })
})
