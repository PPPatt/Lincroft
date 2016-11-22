//TODO Add real splashpage

'use strict'
import React, {Component} from 'react'
import {Text, View} from 'react-native'

const ReactRedux = require('react-redux')
const store = require('../store')
const actions = require('../actions')
const Button = require('../reusables/button')

class Splashpage extends Component {
  constructor(props) {
    super(props)
    //NOTE: used mapStateToProps instead of subscribing to the whole store
    // this.state = {
    //   store: store.getState()
    // }
    // store.subscribe(()=>{
    //   this.setState({store: store.getState()}),
    //   console.log('updated')
    // })
  }
  render() {
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>counter: {this.props.counter}</Text>
        <Button onPress={()=>this.props.increment()}>Increment</Button>
        <Button onPress={()=>this.props.decrement()}>Decrement</Button>
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

  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Splashpage)
