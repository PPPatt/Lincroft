import React from 'react'
import { View, Text } from 'react-native'
const Button = require('./button')

class ViewContainer extends React.Component{
  render() {
    return(
      <View style={[{flex:1, backgroundColor: 'lightgrey'}, this.props.style]}>
        <View style={{height: 60, backgroundColor: 'grey', flexDirection: 'row'}}>
          <Button
            onPress={this.props.back!==undefined?this.props.back:()=>console.log('add prop "back={this.props.navigator.pop()} to ViewContainer', this.props.back)}
            style={{marginTop: 6}}>
            back
          </Button>
          <Text style={{flex: 2,fontSize: 25, margin: 5, marginTop: 12, textAlign: 'center', color: 'white'}}>
            {this.props.title||'placeholder'}
          </Text>
          {this.props.rightButton||false?
            <Button onPress={this.props.onPressRight} style={{marginTop: 6}}>
            {this.props.buttonTitle||'placeholder'}
            </Button>
            :<View style={{flex:1}}/>}
        </View>
        {this.props.children}
      </View>
    )
  }
}

module.exports = ViewContainer
