import { List, Map } from 'immutable'

const initialState = Map({
  name: '',
  description: '',
  members: List([]),
  matrix: Map({}),
})

const calculations = (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATION:LOAD_SUCCESS':
      return state.merge({
        name: action.name,
        description: action.description,
        members: action.members,
        matrix: action.matrix,
      })


    case 'CALCULATION:CREATE_SUCCESS':
      return state.merge({
        name: action.name,
        description: action.description,
        members: action.members,
      });

    case 'CALCULATION:DELETE_SUCCESS':
      return initialState;

    case 'CALCULATION:UPDATE_SUCCESS':
      return state.merge({
        name: action.name,
        description: action.description,
        members: action.members,
      });

    case 'CALCULATION:LOAD_REQUEST':
    case 'CALCULATION:LOAD_FAILURE':
    case 'CALCULATION:CREATE_REQUEST':
    case 'CALCULATION:CREATE_FAILURE':
    case 'CALCULATION:DELETE_REQUEST':
    case 'CALCULATION:DELETE_FAILURE':
    case 'CALCULATION:UPDATE_REQUEST':
    case 'CALCULATION:UPDATE_FAILURE':
    default:
      return state;
  }
}

export default calculations;
