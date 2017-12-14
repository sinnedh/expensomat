import configureStore from './configureStore.prod'

describe('configureStore', () => {
  it('runs without crash', () => {
    const store = configureStore()
    expect(store).toBeDefined()
  })
})
