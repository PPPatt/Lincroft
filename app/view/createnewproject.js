//TODO: resort/rename view and reusable components

'use strict'
import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'

const firebase = require('../reusables/firebase')
const Button = require('../reusables/button')

class CreateNewProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      addUser: '',
      userList: [],
    }
  }
  render() {
    return(
      <View>
        <Text>Title</Text>
        <TextInput
          onChangeText={(i)=>{this.setState({title: i})}}
          value={this.state.title}/>
        <Text>add User</Text>
        <TextInput
          onChangeText={(i)=>{this.setState({addUser: i})}}
          onSubmitEditing={(i)=>{
            let newUserList = this.state.userList
            newUserList.push({id: this.state.addUser})
            this.setState({userList: newUserList, addUser: ''})
          }}
          value={this.state.addUser}/>
        <Text>{this.state.userList.map((e)=>e.id).toString()}</Text>
        <Button onPress={()=>{
          firebase.addProject({
            title: this.state.title,
            members: this.state.userList,
            status: 'underConstruction',
          })
          this.props.switchVisible()
        }}>
        commit
        </Button>
      </View>
    )
  }
}

module.exports = CreateNewProject
