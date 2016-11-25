'use strict'
import React, {Component} from 'react'
import {View, Text} from 'react-native'
const ReactRedux = require('react-redux')

const ViewContainer = require('../reusables/viewcontainer')
const ProjectLogicView = require('../reusables/projectlogicview')

class ProjectLogic extends Component {
  render() {
    return(
      <ViewContainer
        title={this.props.project.properties.title}
        back={()=>{this.props.navigator.pop()}}>
        <ProjectLogicView projID={this.props.projID}/>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects.find((project)=>project.id===ownProps.projID)}
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectLogic)
