import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, Text, Button } from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import LocationManager from './LocationManager'
import { findUserByUid, readAllFiles, readProfile } from '../Firebase/firebaseHelper'
import { Marker } from 'react-native-maps';
import { COLORS, SPACING, ROUNDED, SHADOW, FONTSIZE, SIZE } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserProvider'
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { set } from 'date-fns'
import { useFocusEffect } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';




export default function Map({currentLocation}) {
  const [activityItems, setActivityItems] = useState([]);
  const collectionName = "activities";
  const navigation = useNavigation();
  const { userProfile } = useContext(UserContext);
  //const [profileDownloadurl, setProfileDownloadurl] = React.useState(null);
  // useEffect(() => {
  useFocusEffect(
    React.useCallback(() => {

    async function getProfileDownloadURL(profileUploadURL) {
      try {
        if (profileUploadURL) {
          const imageRef = ref(storage, profileUploadURL);
          const downloadURL = await getDownloadURL(imageRef);
          console.log("Profile picture URL:", downloadURL);
          return downloadURL;
        }
      } catch (err) {
        console.log("Error getting profile picture URL: ", err);
        return null;
      }
    }

    async function fetchProfileUrls(activityItems) {
      try {
        const updatedItems = await Promise.all(
          activityItems.map(async (item) => {
            const user = await findUserByUid(item.owner);
            let profileDownloadURL = null;
    
            if (user && user.userInfo && user.userInfo.profilePicture) {
              const profileUploadURL = user.userInfo.profilePicture;
              profileDownloadURL = await getProfileDownloadURL(profileUploadURL);
            }
    
            return { ...item, profileDownloadurl: profileDownloadURL };
          })
        );
    
        setActivityItems(updatedItems);
      } catch (error) {
        console.log("Error fetching profile URLs to display in map: ", error.message);
      }
    }

    readAllFiles(
      collectionName,
      null,
      'date',
      currentLocation,
      (items) => {
        fetchProfileUrls(items);
      },
      (error) => {
        console.log("Error fetching activities in map", error.message);
      }
    );
  }, [currentLocation])
  );

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
                  {item.profileDownloadurl ? (
                    <Image source={{ uri: item.profileDownloadurl }} style={styles.marker} />
                  ) : (
                    <Avatar
                      size={SIZE.smallAvatar}
                      rounded
                      source={{
                        uri: "https://avatar.iran.liara.run/public/girl"
                      }}
                    />
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
    marker : {
      borderRadius: ROUNDED.l,
      width: SIZE.smallAvatar,
      height: SIZE.smallAvatar,
    }
  });

