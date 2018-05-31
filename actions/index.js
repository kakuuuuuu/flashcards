import { fetchDecks } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

/*
  * Loads all decks from AsyncStorage to store
  * decks - object containing all decks
*/
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
/*
  * Adds deck to store
  * deck - deck object
*/
export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}
/*
  * Updates deck with new card to store
  * deck - deck object
*/
export function addCard (card, id) {
  return {
    type: ADD_CARD,
    card,
    id
  }
}
/*
  * Removes deck from store
  * id - deck key/name
*/
export function deleteDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  }
}
