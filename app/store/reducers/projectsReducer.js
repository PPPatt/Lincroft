'use strict'
const C = require('../../constants')
const initialstate = require("../initialstate")

module.exports = (currentstate, action) => {
  switch(action.type) {
    case C.ADD_PROJECTS:
      return [...action.projects, ...currentstate]
    case C.DELETE_PROJECTS:
      return currentstate.filter((project)=>!action.projIDs.includes(project.id))
    case C.ADD_FUNCTION_TO_PROJECT: //NOTE: non reversible with remote devtools
      let middlestate = currentstate
      let id = currentstate.findIndex((p)=>p.id===action.projID)
      if(middlestate[id].logic) {
        middlestate[id].logic[action.funcID].options[action.opID].action = middlestate[id].logic.length
        middlestate[id].logic.push(action.func)
      } else {
        middlestate[id].logic = []
        middlestate[id].logic.push(action.func)
      }
      return middlestate
    default: return currentstate|| initialstate.projects
  }
}
