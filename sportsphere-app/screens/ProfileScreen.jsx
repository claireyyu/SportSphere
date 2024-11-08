import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS } from '../constants'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ActivityCard />
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