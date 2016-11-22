'use strict'
const counterActions = require('./counterActions')
const projectsActions = require('./projectsActions')

module.exports = Object.assign({}, counterActions, projectsActions)
