import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Shuffle, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { blue, green, red, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }
  state = {
    cards: [],
    score: 0,
    index: 0,
    scored: false,
    flipped: false,
    completed: false
  }
  componentDidMount (){
    this.setState(() => ({
      cards: Shuffle(this.props.navigation.state.params.deck.cards)
    }))
  }

  addScore = (status) => {
    const score = this.state.score
    if(status === true){
      this.setState(() => ({
        score: score + 1,
      }))
    }
    this.setState(() => ({
      scored: true
    }))

  }
  nextCard = () => {
    const { index, cards } = this.state
    if(index == cards.length - 1){
      this.setState(() => ({
        completed: true
      }))
      clearLocalNotification()
      .then(setLocalNotification())
    } else {
      this.setState(() => ({
        index: index + 1,
        scored: false,
      }))
      this.flipCard()
    }
  }
  flipCard = () => {
    if(this.state.flipped === false){
      this.setState(() => ({
        flipped: true
      }))
    } else {
      this.setState(() => ({
        flipped: false,
      }))
    }
  }
  reset = () => {
    this.setState(() => ({
      score: 0,
      index: 0,
      flipped: false,
      completed: false,
      scored: false,
    }))
  }
  render () {
    const { cards, index, flipped, score, completed, scored } = this.state
    return (
      <View style={styles.container}>
        {flipped}
        {(cards && cards.length > 0)
        ? (
          <View>
            <View>
              <Text>
                {index+1}/{cards.length}
              </Text>
            </View>
            {completed === false
              ? (flipped === false
                ? (
                  <View>
                    <View>
                      <Text style={styles.header}>
                        {cards[index].question}
                      </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                      style={Platform.OS === 'ios' ? [styles.iosBtn, styles.correctBtn] : [styles.androidBtn, styles.correctBtn]}
                      onPress={this.flipCard}
                      >
                        <Text style={styles.btnText}>Show Answer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
                : (
                  <View>
                  <View>
                    <Text style={styles.header}>
                      Answer: {cards[index].answer}
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    {scored === false
                      ?(
                        <View>
                          <TouchableOpacity
                          style={Platform.OS === 'ios' ? [styles.iosBtn, styles.correctBtn] : [styles.androidBtn, styles.correctBtn]}
                          onPress={() => this.addScore(true)}
                          >
                            <Text style={styles.btnText}>Correct</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                          style={Platform.OS === 'ios' ? [styles.iosBtn, styles.incorrectBtn] : [styles.androidBtn, styles.incorrectBtn]}
                          onPress={() => this.addScore(false)}
                          >
                            <Text style={styles.btnText}>Incorrect</Text>
                          </TouchableOpacity>
                        </View>
                      )
                      :(
                        <TouchableOpacity
                        style={Platform.OS === 'ios' ? [styles.iosBtn, styles.nextBtn] : [styles.androidBtn, styles.nextBtn]}
                        onPress={this.nextCard}
                        >
                          <Text style={styles.btnText}>Next</Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  </View>
                )
              )
              : (
                <View>
                  <View>
                    <Text style={styles.header}>
                      You Scored: {score}/{cards.length}
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={Platform.OS === 'ios' ? [styles.iosBtn, styles.nextBtn] : [styles.androidBtn, styles.nextBtn]}
                    onPress={this.reset}
                    >
                      <Text style={styles.btnText}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={Platform.OS === 'ios' ? [styles.iosBtn, styles.nextBtn] : [styles.androidBtn, styles.nextBtn]}
                    onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                    >
                      <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          </View>
        )
        : <Text style={styles.header}>
            No cards in this deck
          </Text>
        }
      </View>
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
    fontSize: 40,
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
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
  correctBtn: {
    backgroundColor: green,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  nextBtn: {
    backgroundColor: blue,
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    color: white
  }
})

export default Quiz
