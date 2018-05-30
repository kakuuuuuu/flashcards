import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { blue, white } from '../utils/colors'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewDeck extends Component {

  state = {
    deckName: ''
  }

  handleInputChange = (text) => {
    this.setState(() => ({
      deckName: text
    }))
  }
  handlePress = () => {
    const { deckName } = this.state
    const deck = {
      name: deckName,
      cards: []
    }
    const data = {
      deck,
      id: deckName
    }

    this.props.submit({[deckName]: deck})
    submitDeck({ deck, key: deckName })
    this.setState(() => ({
      deckName: ''
    }))
    this.toHome()
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }))
  }

  render(){
    const { deckName } = this.state
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>
              What is the title of your new deck?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="New Deck Name"
              onChangeText={this.handleInputChange}
              value={deckName}
            />
            <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
              onPress={this.handlePress}>
              <Text style={styles.submitBtnText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  header: {
    fontSize: 25,
    textAlign: 'center'
  },
  iosSubmitBtn:{
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn:{
    backgroundColor: blue,
    marginRight: 15,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  input: {
    alignItems: 'center',
    margin: 15,
    padding: 10,
    height: 60,
    borderColor: blue,
    borderWidth: 1,
    borderRadius: 10
  },
})

function mapStateToProps(decks){
  return {
    decks
  }
}

function mapDispatchToProps(dispatch){
  return {
    submit: (data) => dispatch(addDeck(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeck)
