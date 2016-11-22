'use strict'
const initialstate = require('../initialstate')
const C = require('../../constants')


module.exports = (currentState, action) => {
  let middleState
  switch(action.type) {
    case C.INCREMENT:
      middleState = currentState
      middleState++
      return middleState
    case C.DECREMENT:
      middleState = currentState
      middleState--
      return middleState
    default:
      return currentState || initialstate.counter
  }
}
