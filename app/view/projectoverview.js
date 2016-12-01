'use strict'

import React, {Component} from 'react'
import {View, Text} from 'react-native'

const ReactRedux = require('react-redux')
const firebase = require('../reusables/firebase')
const ViewContainer = require('../reusables/viewcontainer')
const Button = require('../reusables/button')
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

  run() {
    let newProject = this.props.project
    newProject.status = 'active'
    this.props.updateProject(this.props.projID, newProject)
  }

  render() {
    return(
      <ViewContainer
        title={this.props.project.title}
        rightButton={true}
        buttonTitle='delete'
        onPressRight={()=>{this._onNavbarRightPressed()}}
        back={()=>this.props.navigator.pop()}
        style={{alignItems:'center'}}
        >
        <Text style={{margin: 15}}>Title: {this.props.project.title}</Text>
        <Text>Members: {
          this.props.project.members?
            this.props.project.members.map((e)=>e.id).join(', '):
            'no Members declared'}
        </Text>
        <View style={{flex:3}}/>
        <Button onPress={this.run.bind(this)}>
          Run this Mofo!
        </Button>
        <Button onPress={()=>{this.props.navigator.push({id:'ProjectLogic', projID:this.props.projID})}}>
          Show Logic
        </Button>
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
    updateProject: (projID, proj) => {
      store.dispatch(
        actions.updateProject(projID, proj)
      )
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)
