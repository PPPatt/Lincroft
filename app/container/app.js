'use strict'
import React, {Component} from 'react'
import {Navigator, View, Text, TouchableOpacity} from 'react-native'
import {Provider, connect} from 'react-redux'
var ReactRedux = require('react-redux')
var store = require ('../store')
var SplashPage = require('../view/splashpage')

/*
var Home = require('../components/Home')
var Lobby = require('../components/Lobby')
var AddProject = require('../components/AddProject')
var ProjectLevel = require('../components/ProjectLevel')
var AddFunction = require('../components/AddFunction')
var ProjectOverview = require('../components/ProjectOverview')
var AnQs = require('../components/AnQs')
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {store: store}
    store.subscribe(()=>{
      this.setState({store: store.getState()})
    })
  }

  render() {
    return(
    <Provider store={store}>
      <Navigator //NOTE: copy pasted
        initialRoute={{id: 'SplashPage'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            console.log(route.sceneConfig)
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    </Provider>
    )
  }

  renderScene(route,navigator) {
    var routeId = route.id
    switch(routeId) {
      case 'SplashPage':
        //maybe some unmounting in here??
        return (<SplashPage navigator={navigator}/>)
      case 'Home':
        return (<Home navigator={navigator}/>)
      case 'Lobby':
        return(<Lobby navigator={navigator}/>)
      case 'AddProject':
        return(<AddProject navigator={navigator}/>)
      case 'ProjectLevel':
        return(<ProjectLevel navigator={navigator} projID={route.projID} fuID={route.fuID}/>)
      case 'AnQs':
        return(<AnQs navigator={navigator}/>)
      case 'AddFunction':
        return(
          <AddFunction
            navigator={navigator}
            projID={route.projID}
            prevFuID={route.prevFuID}
            optionID={route.optionID}
            newFuName={route.newFuName}/>
        )
      case 'ProjectOverview':
        return(
          <ProjectOverview navigator={navigator}
            projID={route.projID}
            fuID={route.fuID}/>)
      default:
        return this.noRoute(route, navigator)
    }
  }

  noRoute(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>the route {route.id} does not exist</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
module.exports = App
