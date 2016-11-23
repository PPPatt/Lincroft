'use strict'
import React, {Component} from 'react'
import {Text, View} from 'react-native'

const ReactRedux = require('react-redux')
const store = require('../store')
const actions = require('../actions')
const Button = require('../reusables/button')
const firebase = require('../reusables/firebase')

class Splashpage extends Component {
  render() {
    let testProject = {
      properties: {
        title: 'some Title',
        members: [
          {id: 'someUser'},
          {id: 'someOtherUser'}
        ],
      },
      someKey: 'someValue',
    }

    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>counter: {this.props.counter}</Text>
        <Button onPress={()=>this.props.increment()}>Increment</Button>
        <Button onPress={()=>this.props.decrement()}>Decrement</Button>
        <Button onPress={()=>this.props.updateProjects()}>update Projects</Button>
        <Button onPress={()=>firebase.addProject(testProject)}>Firebase Add</Button>
        <Button onPress={()=>this.props.navigator.push({id:'Lobby'})}>goto Lobby</Button>
        <Text>auto get Projects from Server</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {counter: state.counter}
}

const mapDispatchToProps = (dispatch) => {
  return{
    increment: () => {
      store.dispatch(
        actions.increment()
      )
    },
    decrement: () => {
      store.dispatch(
        actions.decrement()
      )
    },
    addProjects: (projects) => {
      store.dispatch(
        actions.addProjects(projects)
      )
    },
    updateProjects: () => {
      store.dispatch(
        actions.updateProjects()
      )
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Splashpage)
