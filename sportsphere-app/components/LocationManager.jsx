import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Button, View, Text } from 'react-native';

export default function LocationManager({ handleCurrentLocation }) {
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          Alert.alert(
            'Permission denied',
            'You need to grant location permission to use this feature.',
            [{ text: 'OK' }]
          );
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        console.log('Current location fetched: ', location);
        handleCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.log('Error when requesting location permission: ', error);
      }
    };

    checkAndRequestPermission();
  }, []); // Only runs once on mount

  return (
    <View>
      {permissionStatus != 'granted' ? (
        <Text>Waiting for location permission...</Text>
      ) : <View />}
    </View>
  );
}