import * as actions from './token'

describe('APPLICATION', () => {
  const token = 'ABCD123'

  it('handles setToken', () => {
    const action = actions.setToken(token)
    expect(action).toMatchSnapshot()
  })
})
