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
          } else {throw('no changes')}
        })
        .catch((e)=>console.warn('error in updateProjects: '+e))
    }
  }
}
