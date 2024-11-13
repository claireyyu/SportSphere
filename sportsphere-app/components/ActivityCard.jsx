import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton';
import { useNavigation } from '@react-navigation/native';
  
export default function ActivityCard({ activityName, venue, date, time, peopleGoing, totalMembers, description, id, owner}) {
  const navigation = useNavigation();
  
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
    });
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{activityName}</Text>
        <Avatar
          size={SIZE.smallAvatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Location: {venue}</Text>
        <Text style={styles.infoText}>Time: {`${date} - ${time}`}</Text>
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
    fontSize: FONTSIZE.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SPACING.xsmall,
  },
  infoContainer: {
    marginVertical: SPACING.small,
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
    backgroundColor: COLORS.primary,
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
