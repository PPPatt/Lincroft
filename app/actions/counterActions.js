'use strict'

module.exports = {
  increment: () => {
    return (dispatch, getState) => {
      dispatch({type: 'increment'})
    }
  },
  decrement: () => {
    return (dispatch, getState) => {
      dispatch({type: 'decrement'})
    }
  }
}
