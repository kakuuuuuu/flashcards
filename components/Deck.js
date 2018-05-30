import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { gray, blue, white, black } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: deck.name
    }
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
          style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styles.addBtn] : [styles.androidSubmitBtn, styles.addBtn]}
          onPress={() => this.props.navigation.navigate(
              'NewCard',
              {deck: deck}
            )}>
            <Text style={[styles.BtnText, styles.addBtnText]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styles.quizBtn] : [styles.androidSubmitBtn, styles.quizBtn]}
          onPress={() => this.props.navigation.navigate(
              'Quiz',
              {deck: deck}
            )}>
            <Text style={[styles.BtnText, styles.quizBtnText]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  iosSubmitBtn:{
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
  androidSubmitBtn:{
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
  BtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  addBtnText: {
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

export default connect(
  mapStateToProps
)(Deck)
