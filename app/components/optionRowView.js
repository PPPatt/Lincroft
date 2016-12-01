'use strict'
import React from 'react'
import {View} from 'react-native'
const optionView = require('./optionView')

module.exports = (args) => {
  let tempReturn = []
  for (let opID in args.options) {
    if(opID>0) {
      tempReturn.push(optionView({...args, opID: opID}))
    }
  }
  return (
    <View
      style = {{flexDirection: 'row'}}
      key = {'op' + args.funcID.toString()}>
      {tempReturn}
    </View>
  )
}
