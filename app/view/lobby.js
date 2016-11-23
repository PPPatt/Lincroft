'use strict'

import React, {Component} from 'react'
import {View, Text} from 'react-native'
const ReactRedux = require('react-redux')

const ViewContainer = require('../reusables/viewcontainer')
const ProjectList = require('../reusables/projectlist.js')

class Lobby extends Component{
  render() {
    return(
      <ViewContainer title='Lobby' rightButton={true} buttonTitle='add' onPressRight={()=>{this.onNavbarRightPressed()}} back={()=>this.props.navigator.pop()}>
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
