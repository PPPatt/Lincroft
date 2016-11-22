'use strict'

import React, {Component} from 'react'
import {View, Text} from 'react-native'

const ReactRedux = require('react-redux')
const firebase = require('../reusables/firebase')
const ViewContainer = require('../reusables/viewcontainer')
const actions = require('../actions')

class ProjectOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      someKey: 'someValue',
      shouldComponentUpdate: false
    }
  }
  _onNavbarRightPressed() {
    firebase.deleteProject(this.props.projID, this.props.navigator.pop)
  }

  render() {
    return(
      <ViewContainer title={this.props.project.properties.title} rightButton={true} buttonTitle='delete' onPressRight={()=>{this._onNavbarRightPressed()}} back={()=>this.props.navigator.pop()}>

      <Text>hi from ProjectOverview {this.state.someKey}</Text>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects[ownProps.projID]}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProjects: (snapshot) => {store.dispatch(
      (dispatch, getState) => {
        dispatch({
          type:C.UPDATE_PROJECTS,
          projects: snapshot
        })
      }
    )},
    addProjects: (projects) => {
      store.dispatch(
        actions.addProjects(projects)
      )
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectOverview)
