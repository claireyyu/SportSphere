import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING } from '../global'

export default function AddActivityScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AddActivityCard />
      </ScrollView>
    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: SPACING.medium,  
  },
})
