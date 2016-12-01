'use strict'
console.ignoredYellowBox = ['Warning: Failed prop type: Invalid props.style key']
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
const ReactRedux = require('react-redux')
const store = require('../store')
const actions = require('../actions')

const styles = require('./styles')
const ViewContainer = require('./viewcontainer')
const functionView = require('../components/functionView')
const optionRowView = require('../components/optionRowView')
const Modal = require('../reusables/modal')
const AddFunction = require('../view/addfunction')
const optionView = require('../components/optionView')

class ProjectLogicView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPath: [],
      ModalVisible_AddFunction: false,
      modalProps: {},
    }
  }

  switchVisible() {
    this.setState({ModalVisible_AddFunction: !this.state.ModalVisible_AddFunction})
  }

  setModalProps(props) {
    this.setState({modalProps: props})
  }

  setPath(pathLvl, opID) {
    let newPath = this.state.selectedPath
    if(opID) {
      newPath.splice(pathLvl, newPath.length+1, opID)
    } else {
      newPath.splice(pathLvl, newPath.length+1)
    }
    this.setState({selectedPath: newPath})
  }

  addFunction(func) {
    this.props.addFunctionToProject(this.props.projID, func, this.state.modalProps.funcID, this.state.modalProps.opID)
  }

  render() {
    return(
      <ScrollView style={styles.outerBorder}>
        {this.state.ModalVisible_AddFunction?
          <Modal switchVisible={()=>{this.switchVisible()}}>
            <AddFunction
              submitToState={(func)=>{
                  this.addFunction(func)
                  this.switchVisible()
                  this.setPath(this.state.modalProps.pathLvl, this.state.modalProps.opID)
              }}/>
          </Modal>:
          null}
        {this.props.project.logic?
          this.iterateLayers():
          this.addIntialFunction()}
      </ScrollView>
    )
  }

  iterateLayers(funcID = 0, tempView = [], pathLvl = 0) {
    let newTempView = this.addLogicLayer(funcID, tempView, pathLvl)
    let nextFu = this.state.selectedPath[pathLvl]!==undefined?
      this.props.project.logic[funcID].options[this.state.selectedPath[pathLvl]].action:
      'blab'
    if(typeof(nextFu)==='number') {
      return this.iterateLayers(nextFu , newTempView, pathLvl+1)
    } else {
      return newTempView
    }
  }

  addLogicLayer(funcID, temp, pathLvl) {
    let fu = this.props.project.logic[funcID]
    temp.push(functionView({fu, funcID}))
    temp.push(optionRowView(
      {
        setPath: this.setPath.bind(this),
        addFunction: this.addFunction.bind(this),
        selectedPath: this.state.selectedPath,
        funcID,
        switchVisible: this.switchVisible.bind(this),
        setModalProps: this.setModalProps.bind(this),
        options: fu.options,
        pathLvl,
        output: fu.output
      }
    ))
    return temp
  }

  addIntialFunction() {
    return(
      <View>
        {optionView(
          {
            funcID: 0,
            switchVisible: this.switchVisible.bind(this),
            setModalProps: this.setModalProps.bind(this),
            pathLvl: -1,
          }
        )}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {project: state.projects.find((project)=>project.id===ownProps.projID)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFunctionToProject: (projID, func, funcID, opID) => {
      store.dispatch(
        actions.addFunctionToProject(projID, func, funcID, opID)
      )
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProjectLogicView)
