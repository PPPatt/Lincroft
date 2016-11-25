'use strict'
console.ignoredYellowBox = ['Warning: Failed prop type: Invalid props.style key']
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
const ReactRedux = require('react-redux')

const ViewContainer = require('./viewcontainer')

class ProjectLogicView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: [] //TODO: Create Initial Path Generator
    }
  }

  setThisOpToPath(pathLvl, opID, reset = false) { //NOTE: Alters Current Viewing Path
    if(reset) {
      let newPath = this.state.path
      newPath.splice(pathLvl, newPath.length)
      this.setState({
        path: newPath
      })
    } else {
      let newPath = this.state.path
      newPath.splice(pathLvl, newPath.length, opID)
      this.setState({
        path: newPath
      })
    }
  }

  render() {
    let logic = this.props.project.logic
    return(
      <ScrollView style={styles.outerBorder}>
        {logic?
          this.renderLogic(logic):
          <Text>Project has no logic, add initilize logic functionality here</Text>}
      </ScrollView>
    )
  }

  addLogicLayer(logic, funcID, temp, pathLvl) { //NOTE: Is being iterated, adds 1 layer of function and options to the view
    let rowTemp = []
    let fu = logic[funcID]
    let nextFuncs
    temp.push(this.renderFunction(fu, funcID)) //NOTE: Renders Function
    let optionRow = this.renderOptionRow(fu.result, pathLvl, funcID)
    temp.push(optionRow.renderPart)
    nextFuncs = optionRow.opFuncs
    return {view: temp, nextFuncs, pathLvl}
  }

  iterateLayers(logic, funcID = 0, temp = [], pathLvl = 0) { //NOTE: Loops through layers selected by current Path, will add "add function to dead end" functionality later on
    let AllCurrentLayers = this.addLogicLayer(logic, funcID, temp, pathLvl)
    //console.warn('iterating at funcID: '+funcID+', pathLvl: '+AllCurrentLayers.pathLvl+', nextFu: '+ AllCurrentLayers.nextFu)
    if(typeof(AllCurrentLayers.nextFuncs[this.state.path[pathLvl]])==='number') {
      return this.iterateLayers(logic, AllCurrentLayers.nextFuncs[this.state.path[pathLvl]], AllCurrentLayers.view, AllCurrentLayers.pathLvl+1)
    } else if (AllCurrentLayers.nextFuncs[this.state.path[pathLvl]]==='none yet') {
      console.warn('lets add a fucntion at path: '+this.state.path.join(', '))
      return AllCurrentLayers.view
    } else {
      //console.warn('just viewing')
      return AllCurrentLayers.view
    }
  }

  getOptionType(op, opID, pathLvl) { //NOTE: called in renderOptionRow and determines option Outcome aswell as optionType(sucsessfull, failed, deadend)
    let type
    let nextFuncID
    if(typeof(op.action)==='number') { //NOTE: switch Preparer + setting nextFu
      if(this.state.path[pathLvl] && opID.toString()===this.state.path[pathLvl].toString()) {
        return {type: 'optionViewSucsess', nextFuncID: op.action}
      } else {
        return {type: 'optionViewFail', nextFuncID: 'not selected'}
      }
    } else { return {type: 'optionViewDeadEnd', nextFuncID: 'none yet'}}
  }

  renderLogic(logic) { //NOTE: Probably Obsolete level
    return(
      <View style={{marginTop: 4}}>{this.iterateLayers(logic)}</View>
    )
  }

  renderFunction(fu, funcID) { //NOTE: Renders function, with more function types switch(fu.type) will be added here
    return(
      <View key={'fu'+funcID.toString()} style={styles.funcView}>
        <View style={styles.Row}>
          <View style={styles.pic}/>
          <View style={styles.innerContainer}>
            <Text>{fu.title?fu.title:'‘no title‘'}</Text>
            <Text>{fu.type}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderOptionRow(options, pathLvl, funcID) { //FIXME: Missleading Name, not only renderes optionRow but also returns an array of the option outcomes (function, deadend)
    let rowTemp = []
    let opFuncs = []
    for(let opID in options) { //NOTE: Iterating Options/Outcomes/Results
      let opProps = this.getOptionType(options[opID], opID, pathLvl)
      rowTemp.push(this.renderOption(options[opID], opID, pathLvl, opProps.type))
      opFuncs.push(opProps.nextFuncID)
    }
    return {
      renderPart: (
        <View key={'optionsofFunction'+funcID.toString()} style={styles.Row}>
          {rowTemp}
        </View>),
      opFuncs
      }
  }

  renderOption(op, opID, pathLvl, opType) { //NOTE: renders option
    let temp
    switch (opType) {
      case 'optionViewSucsess':
        temp = (
          <TouchableOpacity
            key={'op'+opID.toString()}
            style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
            onPress={()=>{this.setThisOpToPath(pathLvl, opID, true)}}>
            <View style={styles.optionViewSucsess}>
              <Text>{op.textOutput}</Text>
              <Text>Sucsess{opID}</Text>
            </View>
          </TouchableOpacity>
        )
        break
      case 'optionViewFail':
        temp = (
          <TouchableOpacity
            key={'op'+opID.toString()}
            style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}
            onPress={()=>{this.setThisOpToPath(pathLvl, opID)}}>
            <View style={styles.optionViewFail}>
              <Text>{op.textOutput}</Text>
              <Text>Fail{opID}</Text>
            </View>
          </TouchableOpacity>
        )
        break
      case 'optionViewDeadEnd':
        temp = (
          <TouchableOpacity
            key={'op'+opID.toString()}
            style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}
            onPress={()=>{this.setThisOpToPath(pathLvl, opID)}}>
            <View style={styles.optionViewDeadEnd}>
              <Text>{op.textOutput}</Text>
              <Text>Deadend{opID}</Text>
            </View>
          </TouchableOpacity>
        )
        break
      default:
        throw('unknown OptionView')
        temp = (<Text>Error?</Text>)
    }
    return temp
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects.find((project)=>project.id===ownProps.projID)}
}

module.exports = ReactRedux.connect(mapStateToProps)(ProjectLogicView)

const styles = StyleSheet.create({
  innerContainer: {
    margin: 7,
    marginLeft: 11,
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  pic: {
    height: 35, width: 35, borderRadius: 3, backgroundColor: 'blue', margin: 4
  },
  Row: {
    flexDirection: 'row'
  },
  funcView: {
    backgroundColor: 'lightblue',
    marginHorizontal: 4,
    borderRadius: 5,
    height: 80 || null
  },
  funcViewMulti: {
    backgroundColor: 'lightblue',
    marginHorizontal: 4,
    borderRadius: 5,
    height: 80 || null,
    flex: 1
  },
  optionViewSucsess: {
    backgroundColor: 'lightgreen',
    marginHorizontal: 15,
    height: 80 || null,
    flex: 1,
  },
  optionViewFail: {
    backgroundColor: 'lightgreen',
    marginBottom: 4,
    marginHorizontal: 15,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    height: 60 || null,
    flex: 1,
  },
  optionViewDeadEnd: {
    backgroundColor: 'red',
    marginBottom: 4,
    marginHorizontal: 15,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    height: 60 || null,
    flex: 1,
  },
  outerBorder: {
    backgroundColor: 'white',
    margin: 10,
    flex: 1,

  },
});
