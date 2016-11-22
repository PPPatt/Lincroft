'use strict'
const C = require('../constants')

module.exports = {

  //NOTE: TAKES AN ARRAY OF PROJECTS AS ARGUMENTS
  addProjects: (projects) => {
    return (dispatch, getState) => {
      dispatch({
        type:C.ADD_PROJECTS,
        projects: projects
      })
    }
  }
}
