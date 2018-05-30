import { AsyncStorage } from 'react-native'
import { receiveDecks } from '../actions'

const DECK_STORAGE_KEY = 'Flashcards:deck'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function submitCard ({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}
