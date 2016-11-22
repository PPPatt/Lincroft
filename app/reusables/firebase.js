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
  getProjectsFromServer(callback) {
    let projects = firebase.database().ref('projects')
    return projects.once('value')
      .then((snapshot) => {
        callback(snapshot.val())
      })
  }
}
