import configureStore from './configureStore.dev'

describe('configureStore', () => {
  it('runs without crash', () => {
    const store = configureStore()
    expect(store).toBeDefined()
  })
})
