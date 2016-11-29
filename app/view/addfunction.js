'use strict'
import React, {Component} from 'react'
import {View, Picker, Text, TextInput} from 'react-native'

const Button = require('../reusables/button')

class AddFunction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canAdd: true,
      funcType: 'deadline',
    }
  }

  createFunction() {
    let placeholder = {
      type: this.state.funcType,
      status: 'inProgress',
      config: {
        deadline: this.state.deadline, //FIXME: ADD ACTUAL TIME FORMAT
      },
      result: [
        {textOutput: ':) we are in time', action: 'resolve'},
        {textOutput: ':( we are out of time', action: 'archive'}
      ],
    }
    return placeholder
  }

  render() {
    return(
      <View>
        <Picker
          selectedValue={this.state.funcType}
          onValueChange={(type) => {
            if(type==='someValue') {
              this.setState({
                funcType: type,
                canAdd: false
              })
            } else {
              this.setState({
                funcType: type,
                canAdd: true
              })
            }
            }}>
          <Picker.Item label="Deadline" value="deadline" />
          <Picker.Item label="More to come" value="someValue" />
        </Picker>
        {this.renderFuncEditor(this.state.funcType)}
        {this.state.canAdd?
          <Button onPress={()=>{this.props.submitToState(this.createFunction())}}>
          add
          </Button>:
          <Button
            onPress={()=>{this.props.submitToState(this.createFunction())}}
            disabled={true}>
          add
          </Button>}
      </View>
    )
  }

  renderFuncEditor(funcType) {
    switch(funcType) {
      case 'deadline':
        return(
          <TextInput
            onChangeText={(i)=>{this.setState({deadline: i})}}
            value={this.state.deadline}
            placeholder='deadline in form of HHMM like 1900 for 7pm'/>
        )
      default:
        return(
          <Text> sorry, this function type is not defined yet</Text>
        )
    }
  }
}

module.exports = AddFunction
