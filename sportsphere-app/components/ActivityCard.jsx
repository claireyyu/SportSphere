import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton';
  
export default function ActivityCard({title, location, time, peopleGoing, totalPeople}) {
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
      <PressableButton componentStyle={styles.button}>
        <Text style={styles.buttonText}>Learn More</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.medium,
    padding: SPACING.medium,
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
    fontSize: FONTSIZE.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  infoContainer: {
    marginVertical: SPACING.small,
  },
  infoText: {
    fontSize: FONTSIZE.medium,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xsmall,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.small,
  },
  peopleCount: {
    fontSize: FONTSIZE.medium,
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
    borderRadius: ROUNDED.small,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.medium,
    fontWeight: 'bold',
  },
});
