import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers'
import sagas from '../sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
  )

  sagaMiddleware.run(sagas)

  return store
}
