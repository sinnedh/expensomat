import React from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import Navigation from './Navigation'

const renderNavigation = (user) => (
  shallow(
    <MemoryRouter location="someLocation">
      <Navigation token={"1234"} user={user}/>
    </MemoryRouter>
  ).find('Navigation').dive()
)

describe('Navigation', () => {
  const initialState = Map()
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('renders properly without user', () => {
    const wrapper = shallow(
      <MemoryRouter location="someLocation">
        <Navigation token={"1234"} />
      </MemoryRouter>
    )
    expect(renderNavigation(null)).toMatchSnapshot()
  })

  it('renders properly with admin-user', () => {
    const user = {name: 'Keek', role: 'admin'}
    expect(renderNavigation(user)).toMatchSnapshot()
  })

  it('renders properly with editor-user', () => {
    const user = {name: 'Keek', role: 'editor'}
    expect(renderNavigation(user)).toMatchSnapshot()
  })

  it('renders properly with observer-user', () => {
    const user = {name: 'Keek', role: 'observer'}
    expect(renderNavigation(user)).toMatchSnapshot()
  })
})
