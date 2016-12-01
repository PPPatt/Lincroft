'use strict'
import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
const styles = require('../reusables/styles')

module.exports = (args) => {
  return(
    <TouchableOpacity key={'fu'+args.funcID.toString()} style={styles.funcView}>
      <View style={styles.Row}>
        <View style={styles.pic}/>
        <View style={styles.innerContainer}>
          <Text>{args.fu.title?args.fu.title:'‘no title‘'}</Text>
          <Text>Type: {args.fu.type}</Text>
          {renderFuSpecs(args.fu)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const renderFuSpecs = (fu) => {
  switch (fu.type) {
    case 'deadline':
      return(
        <Text>Deadline: {fu.config.deadline}</Text>
      )
    case 'survey':
      return(
        <Text>{fu.config.surveyspecs.join(', ')}</Text>
      )
    default:

  }
}
