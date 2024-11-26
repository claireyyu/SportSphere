import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING } from '../global'


export default function AddActivityScreen({route}) {
  const { currentLocation } = route.params;
  const data = [{}]
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={60}>
      <FlatList
        data={data}
        renderItem={() => <AddActivityCard currentLocation={currentLocation}/>}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps='handled'
      />
    </KeyboardAvoidingView>
  )
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: SPACING.medium,  
  },
})
