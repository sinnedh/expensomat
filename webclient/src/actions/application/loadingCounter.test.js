import * as actions from './loadingCounter'

describe('APPLICATION', () => {
  it('handles resetLoadingCounter', () => {
    const action = actions.resetLoadingCounter()
    expect(action).toMatchSnapshot()
  })

  it('handles incrementLoadingCounter', () => {
    const action = actions.incrementLoadingCounter()
    expect(action).toMatchSnapshot()
  })

  it('handles decrementLoadingCounter', () => {
    const action = actions.decrementLoadingCounter()
    expect(action).toMatchSnapshot()
  })
})
