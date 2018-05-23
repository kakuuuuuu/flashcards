import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import { blue, white } from '../utils/colors'

class NewDeck extends Component {

  state = {
    deckName: ''
  }

  handleInputChange = (text) => {
    this.setState(() => ({
      deckName: text
    }))
    console.log(this.state.input)
  }
  handlePress = () => {
    alert(this.state.deckName)
  }

  render(){
    const { deckName } = this.state
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>
            What is the title of your new deck?
          </Text>
        </View>
        <View style={styles.container}>
          <TextInput
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
    )
  }
}

export default NewDeck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
})
