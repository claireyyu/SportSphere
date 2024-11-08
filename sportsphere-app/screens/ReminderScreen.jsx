import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { COLORS } from '../constants'
import ReminderItemList from '../components/ReminderItemList'

export default class ReminderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ReminderItemList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.background,
  },
})