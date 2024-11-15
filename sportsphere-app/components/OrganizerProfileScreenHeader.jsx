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
import { findUserByUid } from '../Firebase/firebaseHelper';

export default function OrganizerProfileScreenHeader({uid}) {
  const navigation = useNavigation();
  const [viewingUserInfo, setViewingUserInfo] = useState({});

  useEffect(() => {
    async function fetchUserInfo() {
      if (uid) {
        const { userInfo } = await findUserByUid(uid);
        setViewingUserInfo(userInfo);
        console.log("Viewing User Info: ", viewingUserInfo);
      }
    }

    fetchUserInfo();
  }, [uid]);

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.topBtnContainer}>
        <PressableButton
          pressedFunction={() => navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </PressableButton>
      </View>

      <View style={styles.profileContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{viewingUserInfo?.username || 'User Name'}</Text>
          <Text style={styles.email}>{viewingUserInfo?.email || 'User Email'}</Text>
          <Text style={styles.bio}>{viewingUserInfo?.bio || 'User Bio'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          componentStyle={styles.messageButton}
          pressedFunction={() => console.log('Message pressed')}
        >
          <Text style={styles.buttonStyle}>Message</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    minHeight: SIZE.profileHeader,
    borderBottomLeftRadius: ROUNDED.default,
    borderBottomRightRadius: ROUNDED.default,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: COLORS.primary,
    // justifyContent: 'center',
  },
  topBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
    marginTop: SPACING.default,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.default,
  },
  messageButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    marginHorizontal: SPACING.large,
    alignItems: 'center',
  },
  buttonStyle: {
    color: COLORS.primary,
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
  },
});
