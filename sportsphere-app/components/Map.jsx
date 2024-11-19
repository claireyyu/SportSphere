import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import LocationManager from './LocationManager'

export default function Map({currentLocation}) {

  return (
    // <View style={styles.container}>
    <>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            }}
        />
    </>
    // </View>
  )
}

export const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    });

