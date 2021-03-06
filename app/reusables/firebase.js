'use strict'
const firebase = require('firebase/app')
require("firebase/auth")
require("firebase/database")

const config = {
    apiKey: 'AIzaSyAbBGGwKnT6QxZ8psE1BYBJUMkCKoyjXr4',
    authDomain: 'myapp-83a73.firebaseapp.com',
    databaseURL: 'https://myapp-83a73.firebaseio.com',
    storageBucket: 'myapp-83a73.appspot.com'
  }

firebase.initializeApp(config)

module.exports = {
  getProjects() {
    return firebase.database().ref('projects').once('value')
  },
  listenToProjects(callback) {
    firebase.database().ref('projects').on('value',
      ()=>{callback()}
    )
  },
  addProject(proj) {
    let projects = firebase.database().ref('projects')
    projects.push(proj)
  },
  deleteProject(projID, callback) {
    let project = firebase.database().ref('projects/'+projID)
    project.set(null)
      .then(() => {
        return project.once("value")
      })
      .then((snapshot) => {
        if(callback) {callback()}
      })
      .catch((e)=>console.warn(e))
  },
  pushProject(projID, newProject) {
    let project = firebase.database().ref('projects/'+projID)
    project.set(newProject)
  }
}
