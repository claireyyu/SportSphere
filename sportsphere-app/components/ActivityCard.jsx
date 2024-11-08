import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton';
  
export default function ActivityCard({ title, location, time, peopleGoing, totalPeople }) {
  function handleToActivityDetail() {
    console.log('Navigating to Activity Detail');
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Avatar
          size={SIZE.smallAvatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Location: {location}</Text>
        <Text style={styles.infoText}>Time: {time}</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={peopleGoing} total={totalPeople} />
        <Text style={styles.peopleCount}>{totalPeople} ppl</Text>
      </View>
      <Text style={styles.goingText}>{peopleGoing} ppl going</Text>
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
    fontSize: FONTSIZE.h3,
    fontWeight: 'bold',
    color: COLORS.text,
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
