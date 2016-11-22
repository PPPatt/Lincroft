'use strict'
const C = require('../constants')
const firebase = require('../reusables/firebase')
module.exports = {

  //NOTE: TAKES AN ARRAY OF PROJECTS AS ARGUMENTS
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
          dispatch({
            type:C.UPDATE_PROJECTS,
            projects: snapshot.val()
          })
        })
        .catch((e)=>console.warn(e))
    }
  }
}
