'use strict'
import React, {Component} from 'react'
import {View, Text} from 'react-native'
const ReactRedux = require('react-redux')
const fb = require('../reusables/firebase')

const ViewContainer = require('../reusables/viewcontainer')
const ProjectLogicView = require('../reusables/projectlogicview')

class ProjectLogic extends Component {
  _onPressRight() {
    fb.updateProject(this.props.projID, this.props.project)
  }

  render() {
    return(
      <ViewContainer
        title={this.props.project.properties.title}
        back={()=>{this.props.navigator.pop()}}
        rightButton={true}
        buttonTitle='submit'
        onPressRight={()=>{this._onPressRight()}}>
        <ProjectLogicView projID={this.props.projID}/>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects.find((project)=>project.id===ownProps.projID)}
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectLogic)
