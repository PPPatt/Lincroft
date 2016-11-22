'use strict'
import React, {Component} from 'react'
import {Navigator, View, Text, TouchableOpacity} from 'react-native'
import {Provider, connect} from 'react-redux'
const ReactRedux = require('react-redux')
const store = require ('../store')
const actions = require('../actions')
const SplashPage = require('../view/splashpage')
const Lobby = require('../view/lobby')
const ProjectOverview = require('../view/projectoverview')
const firebase = require('../reusables/firebase')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {store: store}
    store.subscribe(()=>{
      this.setState({store: store.getState()})
    })
  }

  componentWillMount() {
    firebase.listenToProjects(()=>store.dispatch(actions.updateProjects()))
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
    let routeId = route.id
    switch(routeId) {
      case 'SplashPage':
        return (<SplashPage navigator={navigator}/>)
      case 'Lobby':
        return (<Lobby navigator={navigator}/>)
      case 'ProjectOverview':
        return (<ProjectOverview navigator={navigator} projID={route.projID}/>)
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
