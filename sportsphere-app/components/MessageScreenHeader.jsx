import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, ROUNDED, SIZE, SPACING } from '../global'
import { Avatar } from '@rneui/themed'
import Ionicons from '@expo/vector-icons/Ionicons'
import PressableButton from './PressableButton'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { findUserByUid } from '../Firebase/firebaseHelper'

export default function MessageScreenHeader({uid, otherUserAvatar}) {
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
          <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.theme} />
        </PressableButton>

        <View style={styles.profileContainer}>
        {otherUserAvatar ? (
        <Avatar
          size={SIZE.smallAvatar}
          rounded
          source={{ uri: otherUserAvatar }}
        />
      ) : (
        <Avatar
          size={SIZE.smallAvatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
      )}
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{viewingUserInfo?.username || 'Anonymous'}</Text>
            <Text style={styles.bio}>{viewingUserInfo?.bio || ''}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.themeLight,
  },
  topBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  profileInfo: {
    justifyContent: 'center',
    marginLeft: SPACING.default,
  },
  username: {
    color: COLORS.theme,
    fontSize: FONTSIZE.h2,
    fontWeight: 'bold',
  },
  bio: {
    color: COLORS.secondaryText,
    fontSize: FONTSIZE.tiny,
    fontStyle: 'italic',
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
