import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS, SPACING } from '../global'
import ActivityCardList from '../components/ActivityCardList'

export default function ActivityScreen({modalVisible, modalHandler, currentLocation}) {
  return (
    <View style={styles.container}>
      <ActivityCardList modalVisible={modalVisible} modalHandler={modalHandler} currentLocation={currentLocation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.medium,
  },
})