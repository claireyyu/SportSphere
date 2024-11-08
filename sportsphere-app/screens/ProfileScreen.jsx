import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCardList from '../components/ActivityCardList'
import { COLORS, SPACING } from '../global'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ActivityCardList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.medium,
  },
})