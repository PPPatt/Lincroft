'use strict'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
const styles = require('../reusables/styles')

module.exports = (args) => {
  let opType = getOptionType(args.opID, args.options, args.pathLvl, args.selectedPath)
  switch (opType) {
    case 'initial':
      return(
        <View
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewDeadEnd}
            onPress={()=>{
              args.setModalProps({funcID: args.funcID, opID: args.opID, pathLvl: args.pathLvl})
              args.switchVisible()
            }}>
            <Text style={{textAlign: 'center'}}>Add new Function</Text>
          </TouchableOpacity>
        </View>
      )
      break
    case 'selected':
      return(
        <View
          key={'op'+args.opID.toString()}
          style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewSucsess}
            onPress={()=>{args.setPath(args.pathLvl, null)}}>
            <Text>{args.options[args.opID].textOutput}</Text>
            {args.output==args.opID?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    case 'notSelected':
      return(
        <View
          key={'op'+args.opID.toString()}
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewFail}
            onPress={()=>{args.setPath(args.pathLvl, args.opID)}}>
            <Text>{args.options[args.opID].textOutput}</Text>
            {args.output==args.opID?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    case 'deadend':
      return(
        <View
          key={'op'+args.opID.toString()}
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewDeadEnd}
            onPress={()=>{
              args.setModalProps({funcID: args.funcID, opID: args.opID, pathLvl: args.pathLvl})
              args.switchVisible()
            }}>
            <Text>{args.options[args.opID].textOutput}</Text>
            {args.output==args.opID?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    default:
      throw('unknown OptionView')
      return(<Text>Error?</Text>)
  }
}

const getOptionType = (opID, options, pathLvl, selectedPath) => {
  if(pathLvl===-1) {return 'initial'}
  let opAction = options[opID].action
  if (typeof(opAction)==='number') {
    if(isSelected(opID, pathLvl, selectedPath)) {
      return 'selected'
    } else {
      return 'notSelected'
    }
  } else {
    return 'deadend'
  }
}

const isSelected = (opID, pathLvl, selectedPath) => {
  if(selectedPath[pathLvl]!==undefined && selectedPath[pathLvl]!==null) {
    if (selectedPath[pathLvl].toString()===opID.toString()) {
      return true
    } else {return false}
  } else {return false}
}
