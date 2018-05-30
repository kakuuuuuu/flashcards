import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import DeckPreview from './DeckPreview'
import { white } from '../utils/colors'

class Decks extends Component {

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate(
            'Deck',
            { deck: item }
          )}
        >
          <DeckPreview {...item} />
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    const {decks} = this.props
    return(
      <View>
        <Text style={styles.header}>
          Decks
        </Text>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.name}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS == 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
})

function mapStateToProps(decks){
  return {
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps
)(Decks)
