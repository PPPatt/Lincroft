'use strict'
const C = require('../../constants')
const initialstate = require("../initialstate")

module.exports = (currentstate, action) => {
  switch(action.type) {
    case C.ADD_PROJECTS:
      return [...action.projects, ...currentstate]
    default: return currentstate|| initialstate.projects
  }
}
