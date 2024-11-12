import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, ROUNDED, SHADOW, SIZE, SPACING } from '../global'
import { ProgressBar } from './ProgressBar'
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native';
import { deleteDB, addUserToActivity, removeUserFromActivity } from '../Firebase/firebaseHelper'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { set } from 'date-fns';

export default function ActivityDetailCard({ route }) {
  const { userProfile } = useContext(UserContext);
  const [hasJoined, setHasJoined] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

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

  const { id, activityName, venue, date, time, peopleGoing, totalMembers, description, owner } = route.params;
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
      if (hasJoined) {
        if (hasJoined && userProfile.uid == owner) {
          Alert.alert("You are the owner of this event!");
          return;
        }
        setHasJoined(false);
        await removeUserFromActivity(id, userProfile.uid);
        setPplGoingNumber(pplGoingNumber - 1);
        Alert.alert("You left the event!");
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

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{activityName}</Text>
        <Avatar
          size={SIZE.mediumAvatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
      </View>
      <View style={styles.joinBtnContainer}>
      <PressableButton 
        componentStyle={[styles.button, hasJoined && { backgroundColor: COLORS.border }]}
          pressedFunction={handleJoinActivity}
        >
          <Text style={styles.buttonText}>{hasJoined ? 'Joined' : 'Join Now'}</Text>
      </PressableButton>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.labelText}>Location</Text>
        <Text style={styles.infoText}>{venue}{`\n`}</Text>
        <Text style={styles.labelText}>Date & Time</Text>
        <Text style={styles.infoText}>{`${date} - ${time}\n`}</Text>
        <Text style={styles.labelText}>Description</Text>
        <Text style={styles.infoText}>{description}{`\n`}</Text>
        <Text style={styles.goingText}>Pictures</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={pplGoingNumber} total={totalMembers} />
        <Text style={styles.peopleCount}>{totalMembers} ppl</Text>
      </View>
      <Text style={styles.goingText}>{pplGoingNumber} ppl going</Text>
      {isOwner && <View style={styles.btnContainer}>
        <PressableButton
          componentStyle={[styles.button, { backgroundColor: COLORS.edit }]}
          pressedFunction={handleEditActivity}>
          <Text style={styles.buttonText}>Edit</Text>
        </PressableButton>
        <PressableButton
          componentStyle={[styles.button, { backgroundColor: COLORS.delete }]}
          pressedFunction={handleDeleteActivity}>
          <Text style={styles.buttonText}>Delete</Text>
        </PressableButton>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    margin: SPACING.medium,
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
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xsmall,
    //marginVertical: SPACING.xsmall,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.small,
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
    backgroundColor: COLORS.primary,
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
});