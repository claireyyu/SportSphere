import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global';
import SearchBar from './SearchBar';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '@rneui/themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserProvider';

export default function ProfileScreenHeader() {
  const { userProfile } = useContext(UserContext);
  const navigation = useNavigation();
  
  async function signOutUser() {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => signOutUser() }
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenEditProfile() {
    navigation.navigate("EditProfile");
  }

  function handleOpenReminder() {
    navigation.navigate("Reminder");
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.topBtnContainer}>
      <View style={styles.logoutContainer}>
        <PressableButton
            pressedFunction={handleSignOut}
          >
          <MaterialIcons name="logout" size={24} color="white" />
        </PressableButton>
      </View>
        <View style={styles.alarmContainer}>
          <PressableButton
            pressedFunction={handleOpenReminder}
          >
            <Ionicons name="notifications-outline" size={SIZE.pressableIcon} color={COLORS.background} />
          </PressableButton>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
          <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
          <Text style={styles.bio}>{userProfile?.bio || 'User Bio'}</Text>
          <Text style={styles.bio}>{userProfile?.userDocId || 'User userDocId'}</Text>
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
  topBtnContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.default,
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SPACING.default,
  },
  alarmContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
  },
  email: {
    color: COLORS.defaultBackground,
    fontSize: FONTSIZE.tiny,
    fontStyle: 'italic',
  },
  bio: {
    color: COLORS.background,
    fontSize: FONTSIZE.body,
    marginTop: SPACING.default,
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
