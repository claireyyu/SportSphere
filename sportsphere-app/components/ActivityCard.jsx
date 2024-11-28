import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';  

export default function ActivityCard({ activityName, venue, date, time, peopleGoing, totalMembers, description, id, owner, venuePosition, images}) {
  const navigation = useNavigation();
  const [hasJoined, setHasJoined] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { userProfile } = useContext(UserContext);
  const currentUser = userProfile.uid;

  useEffect(() => {
    if (peopleGoing.includes(currentUser)) {
      setHasJoined(true);
    }

    if (peopleGoing.length == totalMembers) {
      setIsFull(true);
    }
  }, []);

  function handleToActivityDetail() {
    
    navigation.navigate('ActivityDetails', {
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
      images
    });
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <FontAwesome5 name="dot-circle" size={SIZE.badge} color={peopleGoing.includes(currentUser) ? COLORS.primary : (peopleGoing.length == totalMembers ? COLORS.delete : COLORS.theme)} />
        <Text style={styles.title}>{activityName}</Text>

        <Avatar
          size={SIZE.smallAvatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{venue}</Text>
        <Text style={styles.infoText}>{`${time} | ${date}`}</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={peopleGoing.length} total={totalMembers} />
        <Text style={styles.peopleCount}>{totalMembers} ppl</Text>
      </View>
      <Text style={styles.goingText}>{peopleGoing.length} ppl going</Text>
      <PressableButton componentStyle={styles.button} pressedFunction={handleToActivityDetail}>
        <Text style={styles.buttonText}>Learn More</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: ROUNDED.l,
    borderTopRightRadius: ROUNDED.l,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    margin: SPACING.medium,
    marginHorizontal: SPACING.xs,
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
    fontSize: FONTSIZE.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.xsmall,
  },
  infoContainer: {
    marginVertical: SPACING.small,
  },
  joinedText: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    fontSize: FONTSIZE.small,
    color: COLORS.primary,
    padding: SPACING.xsmall,
    borderRadius: ROUNDED.small,
  },
  infoText: {
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xsmall,
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
    marginBottom: SPACING.small,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.theme,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    borderRadius: ROUNDED.default,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
  },
});
