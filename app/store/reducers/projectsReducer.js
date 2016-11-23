'use strict'
const C = require('../../constants')
const initialstate = require("../initialstate")

module.exports = (currentstate, action) => {
  switch(action.type) {
    case C.ADD_PROJECTS: //NOTE: TAKES AN ARRAY OF PROJECTS AS ARGUMENTS
      return [...action.projects, ...currentstate]
    case C.DELETE_PROJECTS: //NOTE: TAKES AN ARRAY OF PROJECTIDS AS ARGUMENTS
      return currentstate.filter((project)=>!action.projIDs.includes(project.id))
    default: return currentstate|| initialstate.projects
  }
}
