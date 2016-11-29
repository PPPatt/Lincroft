'use strict'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
const styles = require('../reusables/styles')

module.exports = (props, fu, funcID) => {
  return(
    <TouchableOpacity key={'fu'+funcID.toString()} style={styles.funcView}>
      <View style={styles.Row}>
        <View style={styles.pic}/>
        <View style={styles.innerContainer}>
          <Text>{fu.title?fu.title:'‘no title‘'}</Text>
          <Text>{fu.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
