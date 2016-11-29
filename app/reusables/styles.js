'use strict'
import {StyleSheet} from 'react-native'
module.exports = StyleSheet.create({
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
    height: 70 || null,
    justifyContent: 'center',
    flex: 1,
  },
  optionViewFail: {
    backgroundColor: 'lightgreen',
    marginBottom: 4,
    marginHorizontal: 15,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    height: 55 || null,
    justifyContent: 'center',
    flex: 1,
  },
  optionViewDeadEnd: {
    backgroundColor: 'red',
    marginBottom: 4,
    marginHorizontal: 15,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    height: 55 || null,
    justifyContent: 'center',
    flex: 1,
  },
  outerBorder: {
    backgroundColor: 'white',
    margin: 10,
    flex: 1,

  },
})
