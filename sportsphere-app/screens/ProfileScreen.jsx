import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard'
import ActivityCardList from '../components/ActivityCardList'
import { COLORS } from '../global'

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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.background,
  },
})