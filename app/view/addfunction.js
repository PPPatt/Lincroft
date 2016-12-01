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
          output: null,
          config: {
            deadline: this.state.deadline, //FIXME: ADD ACTUAL TIME FORMAT
          },
          options: [
            {},
            {textOutput: ':) we are in time', action: 'resolve'},
            {textOutput: ':( we are out of time', action: 'archive'}
          ],
          inputs: {},
        }
      case 'survey':
        return {
          title: 'placeholderfu',
          type: this.state.funcType,
          output: null,
          config: {
            surveyspecs: ['admincall']
          },
          options: [
            {},
            {textOutput: 'lets do it', action: 'resolve'},
            {textOutput: 'näää', action: 'archive'}
          ],
        }
      default:
        return {
          title: 'placeholderfu',
          type: this.state.funcType,
          status: 'inProgress',
          config: {
            surveyspecs: ['admincall']
          },
          options: [ {} ],
        }
    }
  }

  isSubmitValid() { //TODO:
    return true
  }

  render() {
    return(
      <View>
        <Picker
          selectedValue={this.state.funcType}
          onValueChange={(type) => {
              this.setState({
                funcType: type,
                canAdd: this.isSubmitValid()
              })
            }}>
          <Picker.Item label="Deadline" value="deadline" />
          <Picker.Item label="Survey" value="survey" />
          <Picker.Item label="More to come" value="someValue" />
        </Picker>
        {this.renderFuncEditor(this.state.funcType)}
        <Button
          onPress={()=>{this.props.submitToState(this.createFunction(this.state.funcType))}}
          disabled={!this.state.canAdd}>
          add
        </Button>
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
