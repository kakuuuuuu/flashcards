import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { blue, gray } from '../utils/colors'

export default function DeckPreview ({ name, cards }) {
  return (
    <View style={styles.container}>
      <Text style={{color: blue, fontSize: 25}}>
        { name }
      </Text>
      <Text style={{color: gray, fontSize: 15}}>
        Cards: { cards.length }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
