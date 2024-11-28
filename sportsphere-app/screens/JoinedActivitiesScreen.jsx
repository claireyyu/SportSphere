import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../global'

export default function JoinedActivitiesScreen() {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.themeLight, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.theme}}>JoinedActivitiesScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})