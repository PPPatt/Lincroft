'use strict'
const initialstate = require('../initialstate')
const C = require('../../constants')


module.exports = (currentState, action) => {
  switch(action.type) {
    case C.INCREMENT:
      let middleState = currentState
      middleState++
      return middleState
    case C.DECREMENT:
      let middleState = currentState
      middleState--
      return middleState
    default:
      return currentState || initialstate.counter
  }
}
