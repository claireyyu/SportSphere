import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, Text, Button } from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import LocationManager from './LocationManager'
import { readAllFiles, readProfile } from '../Firebase/firebaseHelper'
import { Marker } from 'react-native-maps';
import { COLORS, SPACING, ROUNDED, SHADOW, FONTSIZE } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserProvider'


export default function Map({currentLocation}) {
  const [activityItems, setActivityItems] = useState([]);
  const collectionName = "activities";
  const navigation = useNavigation();
  const { userProfile } = useContext(UserContext);
  const [profileDownloadurl, setProfileDownloadurl] = React.useState(null);
  useEffect(() => {
    readAllFiles(collectionName, null, 'date', currentLocation, setActivityItems, (error) => {
      console.log("Error fetching activities in map", error.message);
    });
    readProfile("users", userProfile.userDocId, setProfileDownloadurl);
  }, []);

  function handleNavigateToDetails(id, activityName, venue, date, time, peopleGoing, totalMembers, description, owner, venuePosition) {
    console.log("Go to details page.", id, activityName, venue, date, time, peopleGoing, totalMembers, description, owner, venuePosition);
    navigation.navigate('ActivityDetails', {id, activityName, venue, date, time, peopleGoing, totalMembers, description, owner, venuePosition});
  }

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
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You're Here!" />

            {activityItems.map((item) => (
                <Marker
                    key={item.id}
                    coordinate={{
                        latitude: item.venuePosition.latitude,
                        longitude: item.venuePosition.longitude,
                    }}
                >
                  {profileDownloadurl ? (
                    <Image source={{ uri: profileDownloadurl }} style={{width: 50, height: 50}} />
                  ) : (
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} style={{width: 50, height: 50}} />
                  )}
                  
                  <Callout onPress={()=>handleNavigateToDetails(item.id, item.activityName, item.venue, item.date, item.time, item.peopleGoing, item.totalMembers, item.description, item.owner, item.venuePosition)}>
                    <View style={styles.customCallout}>
                      <Text style={styles.calloutTitle}>{item.activityName}</Text>
                      <Text style={styles.infoText}>{item.venue.split(',')[0]}</Text>
                      <Text style={styles.infoText}>{item.date}</Text>
                      <Text style={styles.infoText}>{item.time}</Text>
                      <View style={styles.progressContainer}>
                        <ProgressBar value={item.peopleGoing.length} total={item.totalMembers} />
                        <Text style={styles.peopleCount}>{item.totalMembers} ppl</Text>
                      </View>
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
      width: 150,
      height: 130,
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

