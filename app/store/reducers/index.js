'use strict'
import {combineReducers} from 'redux'

const counterReducer = require('./counterreducer')
//const surveysReducer = require('./surveysReducer')
//const answersReducer = require('./answersReducer')

const rootReducer = combineReducers({
  counter: counterReducer,
  //surveys: surveysReducer,
  //answers: answersReducer,
})

module.exports= rootReducer
