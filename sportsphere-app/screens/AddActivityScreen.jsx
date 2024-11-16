import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING } from '../global'


export default function AddActivityScreen() {
  const data = [{}]
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={() => <AddActivityCard />}
        keyExtractor={(item, index) => index.toString()}
      />
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
