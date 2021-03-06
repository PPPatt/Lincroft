'use strict'
const C = require('../constants')
const firebase = require('../reusables/firebase')
module.exports = {
  addProjects: (projects) => {
    return (dispatch, getState) => {
      dispatch({
        type:C.ADD_PROJECTS,
        projects: projects
      })
    }
  },

  updateProjects: () => {
    return (dispatch, getState) => {
      firebase.getProjects()
        .then((snapshot)=>{
          let addedProjects = []
          let newKeys = snapshot.val()?Object.keys(snapshot.val()):[]
          let prevKeys = getState().projects.map((project)=>project.id)
          let diffKeysAdd = newKeys.filter((key)=>!prevKeys.includes(key))
          let diffKeysDel = prevKeys.filter((key)=>!newKeys.includes(key))
          if (diffKeysAdd[0]) {
            diffKeysAdd.forEach((key)=>{
              addedProjects.push({id: key, ...snapshot.val()[key]})
            })
            dispatch({
              type:C.ADD_PROJECTS,
              projects: addedProjects
            })
          } else if (diffKeysDel[0]){
            dispatch({
              type:C.DELETE_PROJECTS,
              projIDs: diffKeysDel
            })
          } else {/*eather no diffs to server or just deep diffs*/}
        })
        .catch((e)=>console.warn('error in updateProjects: '+e))
    }
  },

  updateProject: (projID, proj) => { //TODO: delete and add seems bulky for updating
    let newProj = proj.status==='active'?recalculateAllOutputs(proj): proj
    return (dispatch, getState) => {
      dispatch({
        type:C.DELETE_PROJECTS,
        projIDs: [projID]
      }),
      dispatch({
        type:C.ADD_PROJECTS,
        projects: [newProj]
      })
    }
  },

  addFunctionToProject: (projID, func, funcID, opID) => {
    return (dispatch, getState) => {
      dispatch({
        type: C.ADD_FUNCTION_TO_PROJECT,
        projID,
        func,
        funcID,
        opID
      })
    }
  }
}

const recalculateAllOutputs = (proj) => { //TODO: probably make this into a dispatch
  let outputs = []
  for(let fuID in proj.logic) {
    let output
    let fu = proj.logic[fuID]
    switch (fu.type) {
      case 'deadline':
        output = fu.config.deadline>1500?1:2
        break
      default:
        output=fu.output
    }
    proj.logic[fuID].output = output
  }
  return proj
}
