import { List, Map } from 'immutable'

const initialState = Map()

const members = (state = initialState, action) => {
  switch (action.type) {
    case 'MEMBERS:LOAD_SUCCESS':
      return List(action.items).reduce(
        (result, value) => result.set(value['id'].toString(), Map(value)),
        Map()
      )

    case 'MEMBERS:CREATE_SUCCESS':
      return state.merge({[action.member.id]: Map({...action.member})})

    case 'MEMBERS:DELETE_SUCCESS':
      return state.delete(action.id.toString())

    case 'MEMBERS:UPDATE_SUCCESS':
      return state.merge({[action.id]: {name: action.name}})

    case 'MEMBERS:LOAD_REQUEST':
    case 'MEMBERS:LOAD_FAILURE':
    case 'MEMBERS:CREATE_REQUEST':
    case 'MEMBERS:CREATE_FAILURE':
    case 'MEMBERS:DELETE_REQUEST':
    case 'MEMBERS:DELETE_FAILURE':
    case 'MEMBERS:UPDATE_REQUEST':
    case 'MEMBERS:UPDATE_FAILURE':
    default:
      return state;
  }
}

export default members;
