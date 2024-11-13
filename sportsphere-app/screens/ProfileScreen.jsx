import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileActivityCardList from '../components/ProfileActivityCardList'
import { COLORS, SPACING } from '../global'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileActivityCardList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.medium,
  },
})