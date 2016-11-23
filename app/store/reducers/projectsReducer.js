'use strict'
const C = require('../../constants')
const initialstate = require("../initialstate")

module.exports = (currentstate, action) => {
  switch(action.type) {
    case C.ADD_PROJECTS:
      return {...action.projects, ...currentstate}
    case C.UPDATE_PROJECTS:
      //FIXME: UNDERSTAND WHY DEVTOOLS ARE IMPARED
      //FIXME: MAKE IT SO THAT ACTIONS ARE INTERCHANGABLE AND CAN BE MANIPULATED
      // IN REMOTE DEVTOOLS
      let addedState = {}
      let newKeys = Object.keys(action.projects)
      let prevKeys = Object.keys(currentstate)
      let diffKeysAdd = newKeys.filter((key)=>!prevKeys.includes(key))
      let diffKeysDel = prevKeys.filter((key)=>!newKeys.includes(key))
      diffKeysAdd.forEach((key)=>{
        addedState[key] = action.projects[key]
      })
      let ret = {...addedState, ...currentstate}
      diffKeysDel.forEach((key)=>{delete ret[key]})
      return ret

      return initialstate.projects
    default: return currentstate|| initialstate.projects
  }
}
