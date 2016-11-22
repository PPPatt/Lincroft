'use strict'
import {combineReducers} from 'redux'

const counterReducer = require('./counterReducer')
const projectsReducer = require('./projectsReducer')
//const surveysReducer = require('./surveysReducer')
//const answersReducer = require('./answersReducer')

const rootReducer = combineReducers({
  counter: counterReducer,
  projects: projectsReducer
  //surveys: surveysReducer,
  //answers: answersReducer,
})

module.exports= rootReducer
