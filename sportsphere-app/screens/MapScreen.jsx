import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../global'
import Map from '../components/Map'

export default function MapScreen({ currentLocation }) {
  return (
    <View style={styles.container}>
      <Map currentLocation={currentLocation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})