import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { COLORS, FONTSIZE, ROUNDED, SHADOW, SIZE, SPACING } from '../global'
import { ProgressBar } from './ProgressBar'
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native';

export default function ActivityDetailCard({ route }) {
  const { id, activityName, venue, date, time, peopleGoing, totalMembers, description } = route.params;
  console.log("Route Params ActivityDetailCard: ", route.params);
  const navigation = useNavigation();
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
        <Text style={styles.infoText}>Location:</Text>
        <Text style={styles.infoText}>{venue}{`\n`}</Text>
        <Text style={styles.infoText}>Date & Time: </Text>
        <Text style={styles.infoText}>{`${date} - ${time}\n`}</Text>
        <Text style={styles.infoText}>Description: </Text>
        <Text style={styles.infoText}>{description}{`\n`}</Text>
        <Text style={styles.goingText}>Pictures</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar value={peopleGoing} total={totalMembers} />
        <Text style={styles.peopleCount}>{totalMembers} ppl</Text>
      </View>
      <Text style={styles.goingText}>{peopleGoing} ppl going</Text>
      <PressableButton 
        componentStyle={styles.button}
        pressedFunction={handleEditActivity}>
        <Text style={styles.buttonText}>Edit</Text>
      </PressableButton>
      <PressableButton componentStyle={[styles.button, {backgroundColor: COLORS.delete}]}>
        <Text style={styles.buttonText}>Delete</Text>
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
    fontSize: FONTSIZE.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  infoContainer: {
    marginVertical: SPACING.small,
  },
  infoText: {
    fontSize: FONTSIZE.h3,
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
    marginBottom: SPACING.small,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    borderRadius: ROUNDED.default,
    alignSelf: 'center',
    alignItems: 'center',
    margin: SPACING.xsmall,
    width: 200,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
  },
});
