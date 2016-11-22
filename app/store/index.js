'use strict'
import {createStore, applyMiddleware, compose} from 'redux'
const rootReducer = require('./reducers')
//import Reactotron from 'reactotron-react-native'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'

//NOTE: copy pasted logger for visualizing redux-state change
var logger = store => next => action => {
  console.log('dispatching', action.type, action)
  var result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunkMiddleware)))

module.exports = store
