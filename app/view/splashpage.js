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
        title: 'Triplecheck Time',
        members: [
          {id: 'VerrückterUhrmacher'},
          {id: 'Momo'},
          {id: 'Slowmobius'}
        ],
      },
      logic: [
        {
          type: 'deadline',
          status: 'inProgress', //'sucsessfull', 'failed', 'needsEditing?'
          config: {
            deadline: 1800, //FIXME: ADD ACTUAL TIME FORMAT
          },
          result: [
            {textOutput: 'we are good on Time', action: 1},
            {textOutput: 'lets doublecheck:(', action: 2}
          ],
        }, { //NOTE: TEMPORARY SECOND LVL
          type: 'deadline',
          status: 'inProgress', //'sucsessfull', 'failed', 'needsEditing?'
          config: {
            deadline: 1730, //FIXME: ADD ACTUAL TIME FORMAT
          },
          result: [
            {textOutput: 'we are really good on Time', action: 'resolve'},
            {textOutput: 'sadly we are out of Time', action: 'archive'}
          ],
        }, { //NOTE: TEMPORARY SECOND LVL
          type: 'deadline',
          status: 'inProgress', //'sucsessfull', 'failed', 'needsEditing?'
          config: {
            deadline: 1800, //FIXME: ADD ACTUAL TIME FORMAT
          },
          result: [
            {textOutput: 'we are actually really good on Time', action: 'resolve'},
            {textOutput: 'sadly we are actually really out of Time', action: 'archive'}
          ],
        },
      ],
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
