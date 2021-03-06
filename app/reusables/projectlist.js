'use strict'
import React, {Component} from 'react'
import {Navigator, View, Text, ListView, TouchableOpacity} from 'react-native'

const ReactRedux = require('react-redux')

const Button = require('./button')

class ProjectList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.projects)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.projects)
     })
  }

  updateProject(projID, proj, opID) {
    let newProj = proj
    // newProj.properties.members[0].input = {} //TODO: FIX input location
    // newProj.properties.members[0].input.surveyX = opID
    // this.props.updateProject(projID, newProj)
  }

  render() {
    return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>this.renderRow(rowData)}
          enableEmptySections={true}
        />
    )
  }

  renderRow(rowData) {

    return (
      <View>
        <TouchableOpacity onPress={()=>this.props.onPress(rowData)}>
          <View style={{height: 10}}/>
          <View style={{flexDirection: 'row'}}>
            <View style = {{width:15}}/>
            <Text style={{textAlignVertical: 'center', fontSize: 25}}>{rowData.title}</Text>
            <View style = {{flex:1}}/>
            <Text style={{textAlignVertical: 'center', fontSize: 15}}>status: {rowData.status}</Text>
            <View style = {{width:15}}/>
          </View>
          <View style={{height: 10}}/>
        </TouchableOpacity>
        <View style={{height: 5, backgroundColor: 'grey'}}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {projects: state.projects}
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectList)
