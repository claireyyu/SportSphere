import React from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, Image } from 'react-native'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, ROUNDED, SHADOW, SIZE, SPACING } from '../global'
import { ProgressBar } from './ProgressBar'
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native';
import { deleteDB, addUserToActivity, removeUserFromActivity } from '../Firebase/firebaseHelper'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { set } from 'date-fns';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { parse } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


export default function ActivityDetailCard({ route }) {
  const { userProfile } = useContext(UserContext);
  const [hasJoined, setHasJoined] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [hasCustomImage, setHasCustomImage] = useState(false);

  useEffect(() => {
    console.log("isOwner: ", isOwner);  
    if (route.params.peopleGoing.includes(userProfile.uid)) {
      setHasJoined(true);
    }
    if (route.params.owner == userProfile.uid) {
      setIsOwner(true);
      console.log("Owner: ", userProfile.uid);
    }
    console.log("route.params.owner: ", route.params.owner);
    console.log("userProfile.uid: ", userProfile.uid);
    console.log("isOwner End: ", isOwner);  
  }, []);

  useEffect(() => {
    async function getImageDownloadURL() {
      try {
        if (route.params && route.params.images && route.params.images.length > 0) {
          const imageDownloadUrls = await Promise.all(
            images.map(async (imagePath) => {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              return url;
            })
          );
          setDownloadURLs(imageDownloadUrls);
          setHasCustomImage(true);
          console.log("Download URLs: ", downloadURLs);
        }
      } catch (error) {
      console.error("Error getting image download URL: ", error);
      }
    }
    getImageDownloadURL();
  }, [route.params]);
  
  const { id, activityName, venue, date, time, peopleGoing, totalMembers, description, owner, venuePosition, images, profileDownloadurl } = route.params;
  console.log("Route Params ActivityDetailCard: ", route.params);
  const navigation = useNavigation();
  const [pplGoingNumber, setPplGoingNumber] = useState(peopleGoing.length);
  
  function handleEditActivity() {
    navigation.navigate('EditActivity', {
      id,
      activityName,
      venue,
      date,
      time,
      peopleGoing,
      totalMembers,
      description,
      owner,
      venuePosition,
      images,
      downloadURLs
    });
  }

  const deleteActivity = () => {
    deleteDB(id, "activities");
    navigation.navigate('TabNavigator');
  }

  function handleDeleteActivity() {
    Alert.alert("Delete Activity", "Are you sure you want to delete this activity?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: deleteActivity }
    ]);
  }

  async function handleJoinActivity() {
    try {
      const now = new Date(); // Current date and time
      const activityDate = parse(date, 'MMM dd, yyyy', new Date());
      const activityTime = parse(time, 'HH:mm', new Date());
      activityDate.setHours(activityTime.getHours(), activityTime.getMinutes(), 0);
      if (activityDate <= now) {
        Alert.alert("The event has already passed!");
        return;
      }
      
      if (hasJoined) {
        if (hasJoined && userProfile.uid == owner) {
          Alert.alert("You are the organizer of this event!");
          return;
        }
        setHasJoined(false);
        await removeUserFromActivity(id, userProfile.uid);
        setPplGoingNumber(pplGoingNumber - 1);
        Alert.alert("You left the event!");
        return;
      }
      if (peopleGoing.length == totalMembers) {
        Alert.alert("The event is full!");
        return;
      }
      await addUserToActivity(id, userProfile.uid);
      setHasJoined(true);
      setPplGoingNumber(pplGoingNumber + 1);
      Alert.alert("You joined the event!");
    } catch (error) {
      console.error("Error joining activity: ", error);
    }
  }

  function handleToMessage() {
    if (owner == userProfile.uid) {
      navigation.navigate('Profile');
      return;
    }
    navigation.navigate('Message', { uid: owner, otherUserAvatar: profileDownloadurl });
  }

  return (
    <View style={styles.cardContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{activityName}</Text>
        <PressableButton
          pressedFunction={handleToMessage}>
        {profileDownloadurl ? (
          <Avatar
            size={SIZE.mediumAvatar}
            rounded
            source={{ uri: profileDownloadurl }}
          />
        ) : (
          <Avatar
          size={SIZE.mediumAvatar}
            rounded
            source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
          />
        )}
        </PressableButton>
      </View>
      <View style={styles.joinBtnContainer}>
      <PressableButton 
        componentStyle={[styles.button, (hasJoined || peopleGoing.length >= totalMembers) && { backgroundColor: COLORS.border }]}
          pressedFunction={handleJoinActivity}
        >
          <Text style={styles.buttonText}>{hasJoined ? 'Joined' : (peopleGoing.length >= totalMembers?'Full': 'Join Now')}</Text>
      </PressableButton>
      </View>
        <View style={styles.infoContainer}>
          <View style={[styles.detailContainer, {marginTop: SPACING.small}]}>
          <Ionicons name="location-sharp" size={24} color={COLORS.theme} />
            <Text style={styles.infoText}>{venue}{`\n`}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Ionicons name="time" size={24} color="black" />
            <Text style={styles.infoText}>{`${date} - ${time}\n`}</Text>
          </View>
          <Text style={[styles.infoText, {color: COLORS.secondaryText, marginLeft: SPACING.s, marginTop: SPACING.s, textAlign: 'left', fontSize: FONTSIZE.small, fontFamily: 'Poppins_400Regular'}]}>{description}{`\n`}</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.small }}
          >
          {hasCustomImage ? downloadURLs.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          )) : <Image source={require('../assets/default-detail-photo.png')} style={styles.image} />}
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={pplGoingNumber} total={totalMembers} />
        <Text style={styles.peopleCount}>{totalMembers} ppl</Text>
      </View>
      <Text style={styles.goingText}>{pplGoingNumber} ppl going</Text>
      {isOwner && <View style={styles.btnContainer}>
        <PressableButton
          componentStyle={[styles.button]}
          pressedFunction={handleEditActivity}>
          <Text style={styles.buttonText}>Edit</Text>
        </PressableButton>
        <PressableButton
          componentStyle={[styles.button, { backgroundColor: COLORS.themeLight, borderColor: COLORS.theme, borderWidth: 2 }]}
          pressedFunction={handleDeleteActivity}>
          <Text style={[styles.buttonText, {color: COLORS.theme}]}>Delete</Text>
        </PressableButton>
        </View>}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.l,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.xxl,
    marginVertical: SPACING.medium,
    marginTop: SPACING.xxl,
    // marginHorizontal: SPACING.l,
    // Shadow properties
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SPACING.xsmall, 
    marginTop: SPACING.small,
  },
  infoContainer: {
    marginVertical: SPACING.small,
  },
  labelText: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: SPACING.xsmall,
  },
  infoText: {
    marginLeft: SPACING.xs,
    fontSize: FONTSIZE.body,
    color: COLORS.theme,
    textAlignVertical: 'center',
    // textAlign: 'center',
    //marginVertical: SPACING.xsmall,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  peopleCount: {
    fontSize: FONTSIZE.body,
    color: COLORS.foreground,
    marginLeft: SPACING.small,
    fontWeight: 'bold',
  },
  goingText: {
    fontSize: FONTSIZE.small,
    color: COLORS.foreground,
    marginBottom: SPACING.medium,
    fontWeight: 'bold',
  },
  joinBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: SPACING.small,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.theme,
    paddingVertical: SPACING.xsmall,
    paddingHorizontal: SPACING.small,
    borderRadius: ROUNDED.small,
    alignSelf: 'center',
    alignItems: 'center',
    margin: SPACING.xsmall,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    margin: SPACING.xsmall,
    opacity: 0.9,
    marginLeft: SPACING.None,
    borderRadius: ROUNDED.m,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});