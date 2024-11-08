import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../constants'

export default function ChatDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>This feature requires integration of third-party API, expected to be implemented in following iterations.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
    // backgroundColor: COLORS.background,
  },
})