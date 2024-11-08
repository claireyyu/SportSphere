import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { COLORS } from '../constants'

export default class ReminderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ReminderScreen</Text>
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