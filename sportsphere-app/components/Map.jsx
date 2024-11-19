import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import LocationManager from './LocationManager'
import { readAllFiles } from '../Firebase/firebaseHelper'
import { Marker } from 'react-native-maps';

export default function Map({currentLocation}) {
  const [activityItems, setActivityItems] = useState([]);
  const collectionName = "activities";
  // useEffect(() => {
  //   readAllFiles(collectionName, null, setActivityItems, (error) => {
  //     console.log("Error fetching activities in map", error.message);
  //   });
  //   console.log("Activity items in map: ", activityItems);
  // }, []);
  useEffect(() => {
  setActivityItems([
    {
      id: '1',
      activityName: 'Football',
      venue: 'Park',
      date: '2022-09-09',
      time: '12:00',
      totalMembers: 10,
      uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png',
      venuePosition: {
        latitude: 49.2323,
        longitude: -123.0004,
      },
    },
    {
      id: '2',
      activityName: 'Basketball',
      venue: 'Gym',
      date: '2022-09-09',
      time: '12:00',
      totalMembers: 10,
      uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png',
      venuePosition: {
        latitude: 49.2334,
        longitude: -123.0001,
      },
    },
    {
      id: '3',
      activityName: 'Volleyball',
      venue: 'Beach',
      date: '2022-09-09',
      time: '12:00',
      totalMembers: 10,
      uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png',
      venuePosition: {
        latitude: 49.2357,
        longitude: -123.0009,
      },
    },
  ])
}, []);

  return (
    <>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            }}>
            {activityItems.map((item) => (
                <Marker
                    key={item.id}
                    coordinate={{
                        latitude: item.venuePosition.latitude,
                        longitude: item.venuePosition.longitude,
                    }}
                >
                  <Image source={{ uri: item.uri }} style={{width: 50, height: 50}} />
                  <Callout>
                    <View>
                      <Text>{item.activityName}</Text>
                      <Text>{item.venue}</Text>
                      <Text>{item.date}</Text>
                      <Text>{item.time}</Text>
                      <Text>{item.totalMembers}</Text>
                    </View>
                  </Callout>
                </Marker>
            ))}

        </MapView>
      
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

