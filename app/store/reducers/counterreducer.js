'use strict'
const initialstate = require('../initialstate')


module.exports = (currentState, action)=> {
  switch(action.type) {
    case 'increment':
      var middleState = currentState
      middleState++
      return middleState
    case 'decrement':
      var middleState = currentState
      middleState--
      return middleState
    default:
      return currentState || initialstate.counter
  }
}
