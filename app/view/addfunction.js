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

  createFunction(funcType) {
    switch (funcType) {
      case 'deadline':
        return {
          title: 'placeholderfu',
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
      case 'survey':
        return {
          title: 'placeholderfu',
          type: this.state.funcType,
          status: 'inProgress',
          config: {
            surveyspecs: ['admincall']
          },
          result: [
            {textOutput: 'lets do it', action: 'resolve'},
            {textOutput: 'näää', action: 'archive'}
          ],
        }
      default:

    }

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
          <Picker.Item label="Survey" value="survey" />
          <Picker.Item label="More to come" value="someValue" />
        </Picker>
        {this.renderFuncEditor(this.state.funcType)}
        {this.state.canAdd?
          <Button onPress={()=>{this.props.submitToState(this.createFunction(this.state.funcType))}}>
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
      case 'survey':
        return(
          <View>
            <Text>Add func Editor for Survey here</Text>
            <Text>currently adds a placeholderfu with all specs predefined</Text>
          </View>
        )
      default:
        return(
          <Text> sorry, this function type is not defined yet</Text>
        )
    }
  }
}

module.exports = AddFunction
