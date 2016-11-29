'use strict'
import React from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

//NOTE: has props, onPress(func), style(object) and children(components)
class Button extends React.Component {
  state = {
    active: false,
  }

  _onHighlight = () => {
    this.setState({active: true})
  }


  _onUnhighlight = () => {
    this.setState({active: false})
  }

  _onPress = () => {
    this.props.onPress()
  }

  render() {
    let colorStyle
    if(this.props.disabled) {
      colorStyle = {color: 'lightgrey'}
    } else {colorStyle = { color: this.state.active ? '#fff' : '#000' }}
    return (
      <TouchableHighlight
        disabled = {this.props.disabled||false} //FIXME: kind of dirty but does the job
        onHideUnderlay={this._onUnhighlight}
        onPress={this._onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children || 'placeholder'}</Text>
      </TouchableHighlight>
    )
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  style: React.PropTypes.object
}

module.exports = Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    opacity: 1,
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
})
