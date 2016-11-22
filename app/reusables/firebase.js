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
        callback()
      })
  },
  getProjectsFromServer(callback) {
    let projects = firebase.database().ref('projects')
    projects.once('value')
      .then((snapshot) => {
        callback(snapshot.val())
      })
  },
}
