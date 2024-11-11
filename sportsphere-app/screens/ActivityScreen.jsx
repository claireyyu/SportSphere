import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS, SPACING } from '../global'
import ActivityCardList from '../components/ActivityCardList'

export default function ActivityScreen({modalVisible, modalHandler}) {
  return (
    <View style={styles.container}>
      <ActivityCardList modalVisible={modalVisible} modalHandler={modalHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.medium,
  },
})