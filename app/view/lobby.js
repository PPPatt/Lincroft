'use strict'

import React, {Component} from 'react'
import {View, Text} from 'react-native'
const ReactRedux = require('react-redux')

const ViewContainer = require('../reusables/viewcontainer')
const ProjectList = require('../reusables/projectlist')
const Modal = require('../reusables/modal')
const CreateNewProject = require('./createnewproject')

class Lobby extends Component{
  constructor(props) {
    super(props)
    this.state = {
      ModalVisible_CreateNewProject: false
    }
  }
  
  switchVisible() {
    this.setState({ModalVisible_CreateNewProject: !this.state.ModalVisible_CreateNewProject})
  }

  render() {
    return(
      <ViewContainer title='Lobby' rightButton={true} buttonTitle='add' onPressRight={()=>{this.switchVisible()}} back={()=>this.props.navigator.pop()}>
        {this.state.ModalVisible_CreateNewProject?
          <Modal switchVisible={()=>{this.switchVisible()}}>
            <CreateNewProject switchVisible={()=>{this.switchVisible()}}/>
          </Modal>:
          null}
        <ProjectList
          onPress={(rowData)=>{
            this.props.navigator.push({id:'ProjectOverview', projID: rowData.id})
          }}/>
      </ViewContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {projects: state.projects}
}

module.exports = ReactRedux.connect(mapStateToProps)(Lobby)
