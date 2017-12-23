import * as actions from './members'

describe('MEMBERS', () => {
  const token = 'ABCD123'
  const member = {id: 1, name: 'Member'}

  it('handles getExpenses', () => {
    const action = actions.getMembers(token)
    expect(action).toMatchSnapshot()
  })

  it('handles createMember', () => {
    const action = actions.createMember(token, member)
    expect(action).toMatchSnapshot()
  })

  it('handles deleteMember', () => {
    const action = actions.deleteMember(token, member)
    expect(action).toMatchSnapshot()
  })

  it('handles updateMember', () => {
    const action = actions.updateMember(token, 11, {name: 'Member'})
    expect(action).toMatchSnapshot()
  })
})
