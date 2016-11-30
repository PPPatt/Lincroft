'use strict'
import React from 'react'
import {View} from 'react-native'
const optionView = require('./optionView')

module.exports = (props, options, pathLvl) => {
  let tempReturn = []
  for (let opID in options) {
    tempReturn.push(optionView(
      props,
      options[opID],
      opID, pathLvl,
      getOptionType(
        opID,
        options,
        {opID, pathLvl, selectedPath: props.selectedPath}
      ),
      isLogic(props.logicPath, props.selectedPath, opID, pathLvl)
    ))
  }
  return (
    <View
      style = {{flexDirection: 'row'}}
      key = {'op' + props.funcID.toString()}>
      {tempReturn}
    </View>
  )
}

const isSelected = ({opID, pathLvl, selectedPath}) => {
  if(selectedPath[pathLvl]!==undefined && selectedPath[pathLvl]!==null) {
    if (selectedPath[pathLvl].toString()===opID.toString()) {
      return true
    } else {return false}
  } else {return false}
}

const getOptionType = (opID, options, isSelectedArgs) => {
  let opAction = options[opID].action
  if (typeof(opAction)==='number') {
    if(isSelected(isSelectedArgs)) {
      return 'selected'
    } else {
      return 'notSelected'
    }
  } else {
    return 'deadend'
  }
}

const isLogic = (logicPath, selectedPath, opID, pathLvl) => {
  if(logicPath[0]!==undefined) {
    let tempSelectedPath = selectedPath.slice(0, pathLvl).concat([opID])
    let onLogicStreet = () => {
      for(let i = 0; i<pathLvl+1; i++) {
        if(tempSelectedPath[i].toString()===logicPath[i].toString()) {
          if(i===pathLvl) {
            return true
          }
        } else {break}
      } return false
    }
    return onLogicStreet()
  }
}
