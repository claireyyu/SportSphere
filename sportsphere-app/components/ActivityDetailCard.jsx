import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, ROUNDED, SHADOW, SIZE, SPACING } from '../global'
import { ProgressBar } from './ProgressBar'
import PressableButton from './PressableButton'

export default function ActivityDetailCard({ route, navigation }) {
    const { activityName, venue, date, time, peopleGoing, totalMembers, description } = route.params;
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
        <ProgressBar value={peopleGoing} total={totalMembers} />
        <Text style={styles.peopleCount}>{totalMembers} ppl</Text>
      </View>
      <Text style={styles.goingText}>{peopleGoing} ppl going</Text>
      <View style={styles.buttonContainer}>
        <PressableButton componentStyle={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </PressableButton>
        <PressableButton componentStyle={[styles.button, {backgroundColor: COLORS.delete}]}>
          <Text style={styles.buttonText}>Delete</Text>
        </PressableButton>
      </View>

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
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    color: COLORS.text,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xsmall,
    paddingHorizontal: SPACING.small,
    borderRadius: ROUNDED.small,
    alignSelf: 'center',
    alignItems: 'center',
    margin: SPACING.small,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
  },
});
