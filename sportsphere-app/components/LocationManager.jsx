import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Button, View, Text } from 'react-native';

export default function LocationManager({currentLocation, handleCurrentLocation}) {
  const [response, requestPermission] = Location.useForegroundPermissions();
  async function verifyPermission(){
      try {
          if (response && response.granted) {
              return true;
          }
          const result = await requestPermission();
          console.log("Permission request result: ", result);
          return result.granted;
      } catch (error) {
          console.log("Error when verifying permission: ", error);
      }
    }

  async function locateUserHandler() {
    try {
        const hasPermission = await verifyPermission();
        console.log("Permission status: ", hasPermission);
        if (!hasPermission) {
            Alert.alert("Permission denied", "You need to grant permission to access location.", [{text: "OK"}]);
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        console.log("Current location fetched: ", location);
        handleCurrentLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
    } catch (error) {
        console.log("Error when getting current location: ", error);
    }
  }
  

  useEffect(() => {
    console.log("Permission: ", response);
    locateUserHandler();
    
  }
    , [response]);

  return (
    <View>
    </View>
  )
}
