import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, Button } from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import LocationManager from './LocationManager'
import { readAllFiles } from '../Firebase/firebaseHelper'
import { Marker } from 'react-native-maps';
import { COLORS, SPACING, ROUNDED, SHADOW, FONTSIZE } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton'


export default function Map({currentLocation}) {
  const [activityItems, setActivityItems] = useState([]);
  const collectionName = "activities";
  useEffect(() => {
    readAllFiles(collectionName, null, 'date', currentLocation, setActivityItems, (error) => {
      console.log("Error fetching activities in map", error.message);
    });
    console.log("Activity items in map: ", activityItems);
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
                  <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} style={{width: 50, height: 50}} />
                  <Callout>
                    <View style={styles.customCallout}>
                      <Text style={styles.calloutTitle}>{item.activityName}</Text>
                      <Text style={styles.infoText}>{item.venue.split(',')[0]}</Text>
                      <Text style={styles.infoText}>{item.date}</Text>
                      <Text style={styles.infoText}>{item.time}</Text>
                      <View style={styles.progressContainer}>
                        <ProgressBar value={item.peopleGoing.length} total={item.totalMembers} />
                        <Text style={styles.peopleCount}>{item.totalMembers} ppl</Text>
                      </View>
                      <PressableButton componentStyle={styles.button} pressedFunction={()=>console.log("Go to detail page.")}>
                        <Text style={styles.buttonText}>Learn More</Text>
                      </PressableButton>
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
    customCallout: {
      width: 200,
      height: 150,
      backgroundColor: COLORS.background,
      borderRadius: ROUNDED.default,
      alignItems: 'center',
      justifyContent: 'center',
    },
    calloutTitle: {
      fontSize: FONTSIZE.small,
      fontWeight: 'bold',
      color: COLORS.foreground,
      marginBottom: SPACING.xsmall,
    },
    infoText: {
      fontSize: FONTSIZE.tiny,
      color: COLORS.secondaryText,
      marginBottom: SPACING.xsmall,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.small,
    },
    peopleCount: {
      fontSize: FONTSIZE.small,
      color: COLORS.foreground,
      marginLeft: SPACING.small,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.xsmall,
      paddingHorizontal: SPACING.small,
      borderRadius: ROUNDED.default,
      alignSelf: 'center',
    },
    buttonText: {
      color: COLORS.background,
      fontSize: FONTSIZE.tiny,
      fontWeight: 'bold',
    },
  });

