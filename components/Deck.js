import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { gray, blue, white, black, red } from '../utils/colors'
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.name
    }
  }
  /*
    * Handles deleting deck
    * Removes deck from AsyncStorage then Store
    * Goes back to previous screen on stack
  */
  handleDelete = () => {
    const { deck } = this.props
    removeDeck(deck.name)
      .then(this.props.remove(deck.name))
      .then(this.props.navigation.dispatch(NavigationActions.back()))
  }
  render(){
    const { deck } = this.props
    return(
      <View style={{flex: 1}}>
        <View style={styles.container}>
          {(deck && (
            <View>
              <Text style={styles.header}>
                {deck.name}
              </Text>
              <Text style={styles.subHeader}>
                {deck.cards.length} Cards
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={Platform.OS === 'ios' ? [styles.iosBtn, styles.addBtn] : [styles.androidBtn, styles.addBtn]}
          onPress={() => this.props.navigation.navigate(
              'NewCard',
              {deck: deck}
            )}>
            <Text style={[styles.BtnText, styles.whiteText]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={Platform.OS === 'ios' ? [styles.iosBtn, styles.quizBtn] : [styles.androidBtn, styles.quizBtn]}
          onPress={() => this.props.navigation.navigate(
              'Quiz',
              {deck: deck}
            )}>
            <Text style={[styles.BtnText, styles.quizBtnText]}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={Platform.OS === 'ios' ? [styles.iosBtn, styles.deleteBtn] : [styles.androidBtn, styles.deleteBtn]}
          onPress={this.handleDelete}>
            <Text style={[styles.BtnText, styles.whiteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    alignSelf: 'center'
  },
  subHeader: {
    fontSize: 30,
    color: gray,
    alignSelf: 'center'
  },
  iosBtn:{
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    width: 200,
    height: 60,
    justifyContent: 'center'
  },
  androidBtn:{
    width: 200,
    marginTop: 20,
    marginRight: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtn: {
    backgroundColor: blue,
  },
  quizBtn: {
    backgroundColor: white,
    borderColor: black
  },
  deleteBtn: {
    backgroundColor: red
  },
  BtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  whiteText: {
    color: white,
  },
  quizBtnText: {
    color: black
  }
})

function mapStateToProps (decks, ownProps) {
  return {
    deck: decks[ownProps.navigation.state.params.deck.name]
  }
}
function mapDispatchToProps (dispatch) {
  return {
    remove: (id) => dispatch(deleteDeck(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck)
