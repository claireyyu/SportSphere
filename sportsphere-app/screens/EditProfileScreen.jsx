import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING } from '../constants';
import PressableButton from '../components/PressableButton';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen() {
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
        <ProfileCard name="lily_y" email="lily_y@gmail.com" bio="Nothing yet."/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    // backgroundColor: COLORS.background,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  editProfile: {
    fontWeight: 'bold',
    marginTop: SPACING.small,
  },
})