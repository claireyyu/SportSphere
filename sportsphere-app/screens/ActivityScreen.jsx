import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS } from '../global'
import ActivityCardList from '../components/ActivityCardList'

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <ActivityCardList />
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