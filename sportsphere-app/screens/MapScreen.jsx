import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../global'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.background,
  },
})