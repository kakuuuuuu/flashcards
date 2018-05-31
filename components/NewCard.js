import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { white, blue } from '../utils/colors'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'

import { submitCard } from '../utils/api'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: 'Add Card'
    }
  }
  state = {
    question: '',
    answer: ''
  }
  handleQuestionChange = (text) => {
    this.setState(() => ({
      question: text
    }))
  }
  handleAnswerChange = (text) => {
    this.setState(() => ({
      answer: text
    }))
  }
  handlePress = () => {
    const { question, answer } = this.state
    const { deck } = this.props.navigation.state.params
    const card = {
      question,
      answer
    }
    const newDeck = {
      ...deck,
      cards: [
        ...deck['cards'],
        card
      ]
    }
    this.props.submit(card, deck.name)
    submitCard({ key: deck.name, deck: newDeck })
    this.setState(() => ({
      question: '',
      answer: ''
    }))
    this.toHome()
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  render(){
    const { deck } = this.props.navigation.state.params
    const { question, answer} = this.state
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Question"
            onChangeText={this.handleQuestionChange}
            value={question}
            keyboardShouldPersistTaps={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            onChangeText={this.handleAnswerChange}
            value={answer}
            keyboardShouldPersistTaps={false}
          />
          <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={this.handlePress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
          </TouchableOpacity>
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

function mapDispatchToProps (dispatch) {
  return {
    submit: (data, id) => dispatch(addCard(data, id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewCard)
