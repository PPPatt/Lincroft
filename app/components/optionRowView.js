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
        {opID, pathLvl, path: props.path}
      )
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

const isSelected = ({opID, pathLvl, path}) => {
  if(path[pathLvl]) {
    if (path[pathLvl].toString()===opID.toString()) {
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