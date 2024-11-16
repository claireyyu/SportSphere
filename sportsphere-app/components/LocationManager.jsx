import React, { useEffect } from 'react'
import * as Location from 'expo-location';
import { View } from 'react-native';

export default function LocationManager({currentLocation, handleCurrentLocation}) {
  //console.log("current location: ", currentLocation);
  const [response, requestPermission] = Location.useForegroundPermissions();
  
  async function locateUserHandler() {
    try {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        console.log("Current location: ", location.coords);
        const { latitude, longitude } = location.coords;
        handleCurrentLocation({latitude, longitude});
        console.log("Current location coords: ", currentLocation);
    } catch (error) {
        console.log("Error when getting current location: ", error);
    }
  }
  const verifyPermission = async () => {
    if (response == 'granted') {
        return true;
    }
    const result = await requestPermission();
    if (result.status !== 'granted') {
        return false;
    } else {
        return true;
    }   
}
  useEffect(() => {
    locateUserHandler();
  }
    , []);
  return (
    <View>
    </View>
  )
}
