import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global';
import CustomSearchBar from './CustomSearchBar';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '@rneui/themed';

export default function ProfileScreenHeader({ navigation }) {

  function handleOpenEditProfile() {
    navigation.navigate("EditProfile");
  }

  function handleOpenReminder() {
    navigation.navigate("Reminder");
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.alarmContainer}>
        <PressableButton
          pressedFunction={handleOpenReminder}
        >
          <Ionicons name="alarm-outline" size={SIZE.pressableIcon} color={COLORS.background} />
        </PressableButton>
      </View>
      <View style={styles.profileContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>User Name</Text>
          <Text style={styles.bio}>The user bio.</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          componentStyle={styles.editButton}
          pressedFunction={handleOpenEditProfile}
        >
          <Text style={styles.buttonStyle}>Edit Profile</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    minHeight: SIZE.profileHeader,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: ROUNDED.default,
    borderBottomRightRadius: ROUNDED.default,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  alarmContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: SPACING.default,
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
  },
  profileInfo: {
    justifyContent: 'center',
    marginLeft: SPACING.default,
  },
  username: {
    color: COLORS.background,
    fontSize: FONTSIZE.h2,
    fontWeight: 'bold',
  },
  bio: {
    color: COLORS.background,
    fontSize: FONTSIZE.body,
    marginTop: SPACING.xsmall,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.default,
  },
  editButton: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  buttonStyle: {
    color: COLORS.primary,
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
  },
});
