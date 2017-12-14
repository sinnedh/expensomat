import * as actions from './calculations'

describe('CALCULATIONS', () => {
  const token = 'ABCD123'
  const calculation = {id: 1, name: 'Calculation'}

  it('handles getCalculation', () => {
    const action = actions.getCalculation(token)
    expect(action).toMatchSnapshot()
  })

  it('handles createCalculation', () => {
    const action = actions.createCalculation(calculation)
    expect(action).toMatchSnapshot()
  })

  it('handles deleteCalculation', () => {
    const action = actions.deleteCalculation(token, calculation)
    expect(action).toMatchSnapshot()
  })

  it('handles updateCalculation', () => {
    const action = actions.updateCalculation(token, {name: 'Calculation'})
    expect(action).toMatchSnapshot()
  })

  it('handles updateMember', () => {
    const members = [{id: 1, name: 'Horst'}, {id: 2, name: 'Dirk'}, {id: 3, name: 'Kalle'}]
    const member = {id: 2, name: 'Dirk'}
    const changes = {name: 'Keek'}
    const action = actions.updateMember(token, members, member, changes)
    expect(action).toMatchSnapshot()
  })
})
