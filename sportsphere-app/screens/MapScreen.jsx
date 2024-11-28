import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING, FONTSIZE } from '../global'
import Map from '../components/Map'

export default function MapScreen({ currentLocation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Map</Text>
      </View>
      <Map currentLocation={currentLocation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.xxl,
    padding: SPACING.l,

  }
})