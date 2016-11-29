//copy pasted
'use strict'
import React from 'react'
import { View, Text, Modal, StyleSheet} from 'react-native'

var Button = require('./button')

class MyModal extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      animationType: 'fade',
      transparent: true,
    }
  }
  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    }
    return(
      <Modal
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={true}
        onRequestClose={() => this.setState({modalVisible: !this.state.modalVisible})}
        >
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            {this.props.children}
            <Button
              onPress={this.props.switchVisible}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
    alignSelf: 'center'
  },
  pickerItem: {
    fontSize: 16,
  },
});

module.exports = MyModal
