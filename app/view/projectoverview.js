'use strict'

import React, {Component} from 'react'
import {View, Text} from 'react-native'

const ReactRedux = require('react-redux')
const firebase = require('../reusables/firebase')
const ViewContainer = require('../reusables/viewcontainer')
const actions = require('../actions')
const store = require('../store')

class ProjectOverview extends Component {
  _onNavbarRightPressed() {
    this.props.navigator.pop()
    firebase.deleteProject(this.props.project.id)
  }

  callback() {
    this.props.navigator.pop()
  }

  shouldComponentUpdate() { //FIXME: temporary fix to prevent warning when open project is being deleted
    return false
  }

  render() {
    return(
      <ViewContainer
        title={this.props.project.properties.title}
        rightButton={true}
        buttonTitle='delete'
        onPressRight={()=>{this._onNavbarRightPressed()}}
        back={()=>this.props.navigator.pop()
        }>

      <Text>hi from ProjectOverview</Text>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects.find((project)=>project.id===ownProps.projID)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProjects: (projects) => {
      store.dispatch(
        actions.addProjects(projects)
      )
    },
    updateProjects: () => {
      store.dispatch(
        actions.updateProjects()
      )
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)
