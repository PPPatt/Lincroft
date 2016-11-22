//TODO Add real splashpage

'use strict'
import React, {Component} from 'react'
import {Text, View} from 'react-native'

const ReactRedux = require('react-redux')
const store = require('../store')
const actions = require('../actions')
const Button = require('../reusables/button')
const firebase = require('../reusables/firebase')

class Splashpage extends Component {
  constructor(props) {
    super(props)
  }

  callback(proj) {
    this.props.addProjects(proj)
  }
  render() {
    let testProjects = {
      someKey: {title: 'someTitle', config: {someKey: 'someValue'}},
      someOtherKey: {title: 'someOtherTitle', config: {someOtherKey: 'someOtherValue'}}
    }
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>counter: {this.props.counter}</Text>
        <Button onPress={()=>this.props.increment()}>Increment</Button>
        <Button onPress={()=>this.props.decrement()}>Decrement</Button>
        <Button onPress={()=>this.props.addProjects(testProjects)}>Add Test Project</Button>
        <Button onPress={()=>firebase.addProject(testProjects[0])}>Firebase Add</Button>
        <Button onPress={()=>{firebase.getProjectsFromServer(this.props.addProjects.bind(this))}}>Firebase get and Import</Button>
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
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Splashpage)
