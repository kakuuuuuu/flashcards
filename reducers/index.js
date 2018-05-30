import { combineReducers } from 'redux'
import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const INITIAL_STATE = {
  Test: {
    name: 'Test',
    cards: [
      {
        question: 'Is the cake a lie?',
        answer: 'Hell yeah'
      }
    ]
  }
}

function decks (state = INITIAL_STATE, action) {
  const { deck, card, id } = action
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...data.decks
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
    default:
      return state
  }
}





export default decks
