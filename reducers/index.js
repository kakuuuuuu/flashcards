import { combineReducers } from 'redux'
import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK
} from '../actions'

function decks (state = {}, action) {
  const { deck, card, id, decks } = action
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...deck
      }
    case ADD_CARD:
      return {
        ...state,
        [id]: {
          ...state[id],
          cards: [
            ...state[id]['cards'],
            card
          ]
        }
      }
    case REMOVE_DECK:
    let newState = Object.assign({}, state) // assuming you use Object.assign() polyfill!
    delete newState[id] // shallowly mutating a shallow copy is fine
    return newState
    default:
      return state
  }
}





export default decks
