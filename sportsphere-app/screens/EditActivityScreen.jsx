import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING } from '../global'

export default function EditActivityScreen({ route }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AddActivityCard route={route}/>
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
