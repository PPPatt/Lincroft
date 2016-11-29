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
      allPaths: [],
      currentPath: [], //TODO: Create Initial Path Generator
      ModalVisible_AddFunction: false,
      modalProps: {},
    }
  }

  componentWillMount() {
    this.updatePathTree()
  }

  switchVisible() {
    this.setState({ModalVisible_AddFunction: !this.state.ModalVisible_AddFunction})
  }

  setModalProps(props) {
    this.setState({modalProps: props})
  }

  updatePathTree() {
    const constructPathTree = (logic) => {
      let tempReturn = []
      for(let fuID in logic) {
        let fu = logic[fuID]
        let tempOps = []
        for(let opID in fu.result) {
          let op = fu.result[opID]
          tempOps.push(op.action)
        }
        tempReturn.push(tempOps)
      }
      return tempReturn
    }
    let newPathTree = constructPathTree(this.props.project.logic)
    this.setState({allPaths: newPathTree})
  }

  setPath(pathLvl, opID) {
    let newPath = this.state.currentPath
    newPath.splice(pathLvl, newPath.lenght, opID)
    this.setState({currentPath: newPath})
  }

  addFunction(func) {
    this.props.addFunctionToProject(this.props.projID, func, this.state.modalProps.funcID, this.state.modalProps.opID)
    this.updatePathTree()
  }

  render() {
    let logic = this.props.project.logic
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
        {logic?
          this.iterateLayers(logic):
          this.addIntialFunction()}
      </ScrollView>
    )
  }

  iterateLayers(logic, funcID = 0, tempView = [], pathLvl = 0) {
    let newTempView = this.addLogicLayer(logic, funcID, tempView, pathLvl)
    let nextFu = this.state.currentPath[pathLvl]?
      this.state.allPaths[funcID][this.state.currentPath[pathLvl]]:
      'nothingness' //FIXME
    if(typeof(nextFu)==='number') {
      return this.iterateLayers(logic, nextFu , newTempView, pathLvl+1)
    } else {return newTempView}
  }

  addLogicLayer(logic, funcID, temp, pathLvl) {
    let fu = logic[funcID]
    temp.push(functionView({} , fu, funcID, ))
    temp.push(optionRowView(
      {
        setPath: this.setPath.bind(this),
        addFunction: this.addFunction.bind(this),
        path: this.state.currentPath,
        funcID,
        switchVisible: this.switchVisible.bind(this),
        setModalProps: this.setModalProps.bind(this)
      },
      fu.result,
      pathLvl
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
            setModalProps: this.setModalProps.bind(this)
          },
          null, null, -1, 'initial'
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
