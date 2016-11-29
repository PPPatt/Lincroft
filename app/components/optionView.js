'use strict'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
const styles = require('../reusables/styles')

module.exports = (props, op, opID, pathLvl, opType, isLogic = false) => {
  switch (opType) {
    case 'initial':
      return(
        <View
          key={0}
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewDeadEnd}
            onPress={()=>{
              props.setModalProps({funcID: props.funcID, opID, pathLvl})
              props.switchVisible()
            }}>
            <Text style={{textAlign: 'center'}}>Add new Function</Text>
          </TouchableOpacity>
        </View>
      )
      break
    case 'selected':
      return(
        <View
          key={'op'+opID.toString()}
          style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewSucsess}
            onPress={()=>{props.setPath(pathLvl, null)}}>
            <Text>{op.textOutput}</Text>
            {isLogic?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    case 'notSelected':
      return(
        <View
          key={'op'+opID.toString()}
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewFail}
            onPress={()=>{props.setPath(pathLvl, opID)}}>
            <Text>{op.textOutput}</Text>
            {isLogic?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    case 'deadend':
      return(
        <View
          key={'op'+opID.toString()}
          style={{flex: 1, alignItemsHorizontal: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.optionViewDeadEnd}
            onPress={()=>{
              props.setModalProps({funcID: props.funcID, opID, pathLvl})
              props.switchVisible()
            }}>
            <Text>{op.textOutput}</Text>
            {isLogic?<Text style={{fontSize:25, textAlign: 'center'}}>V</Text>:null}
          </TouchableOpacity>
        </View>
      )
      break
    default:
      throw('unknown OptionView')
      return(<Text>Error?</Text>)
  }

}
