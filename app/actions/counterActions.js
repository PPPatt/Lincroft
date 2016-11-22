'use strict'
const C = require('../constants')

module.exports = {
  increment: () => {
    return (dispatch, getState) => {
      dispatch({type: C.INCREMENT})
    }
  },
  decrement: () => {
    return (dispatch, getState) => {
      dispatch({type: C.DECREMENT})
    }
  }
}
