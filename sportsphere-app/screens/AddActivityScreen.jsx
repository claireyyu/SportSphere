import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING, COLORS, FONTSIZE } from '../global'

export default function AddActivityScreen({currentLocation}) {
  const data = [{}]

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={60}>
      <View>
        <Text style={styles.title}>New Activity</Text>
      </View>
      <AddActivityCard currentLocation={currentLocation}/>
    </KeyboardAvoidingView>
  )
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l, 
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.xxl,
  }
})
