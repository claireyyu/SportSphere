import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, SIZE, SPACING } from '../global';
import PressableButton from '../components/PressableButton';
import ProfileCard from '../components/ProfileCard';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';

export default function EditProfileScreen() {
  const { userProfile } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{
            uri: "https://avatar.iran.liara.run/public/girl"
          }}
        />
        <PressableButton>
          <Text style={styles.editProfile}>Change Profile Photo</Text>
        </PressableButton>
      </View>
      <View style={styles.editProfileContainer}>
        <ProfileCard name={userProfile.username} email={userProfile.email} bio={userProfile.bio}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  editProfile: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    marginTop: SPACING.small,
  },
})