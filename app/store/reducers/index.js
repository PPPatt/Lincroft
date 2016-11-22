'use strict'
import {combineReducers} from 'redux'

const counterReducer = require('./counterReducer')
const projectsReducer = require('./projectsReducer')

const rootReducer = combineReducers({
  counter: counterReducer,
  projects: projectsReducer,
})

module.exports= rootReducer
