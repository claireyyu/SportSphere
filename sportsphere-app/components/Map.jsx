import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import LocationManager from './LocationManager'
import { readAllFiles } from '../Firebase/firebaseHelper'

export default function Map({currentLocation}) {
  const [activityItems, setActivityItems] = useState([]);
  const collectionName = "activities";
  useEffect(() => {
    readAllFiles(collectionName, null, setActivityItems, (error) => {
      console.log("Error fetching activities in map", error.message);
    });
    console.log("Activity items in map: ", activityItems);
  }, []);

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

