'use strict'
var C = require('../../constants')
var initialstate = require("../initialstate")
//var extras = require('../../components/extras')

module.exports = (currentstate, action) => {
  switch(action.type) {
    case C.ADD_PROJECTS:
      return [...action.projects, ...currentstate]
    default: return currentstate|| initialstate.projects
  }
}
